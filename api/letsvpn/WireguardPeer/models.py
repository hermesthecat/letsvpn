import random
import subprocess
from io import BytesIO
from ipaddress import ip_network

from django.core.files import File
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import qrcode


from api.logging import log
from api.models import UUIDModel
from api.settings import AUTH_USER_MODEL
from api.utils import generate_keypair
from letsvpn.WireguardServer.models import WireguardServer


def dhcp(ip, subnet):
    """
    Generates a random IP address in the subnet
    @param ip: IP address that the network resides in
    @param subnet: Subnet bits
    @return: String: IP address
    """
    network: ip_network = ip_network(f'{ip}/{subnet}', strict=False)
    hosts = list(network.hosts())
    return str(hosts[random.randint(0, len(hosts)-1)])

def get_default_dns():
    pass


from netifaces import interfaces, ifaddresses, AF_INET
import ipaddress

def get_server_v4addresses():
    ip_list = []
    for interface in interfaces():
        for link in ifaddresses(interface)[AF_INET]:
            address = ipaddress.IPv4Address(link['addr'])
            if address.is_private and not str(address).startswith('127') and not str(address).startswith('172'):
                ip_list.append()
    return ip_list


class WireguardPeer(UUIDModel):
    class Meta:
        verbose_name = 'WireGuard Peer'
        verbose_name_plural = 'WireGuard Peers'

    # Not in config
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')
    server = models.ForeignKey(WireguardServer, default=WireguardServer.get_default, on_delete=models.SET_DEFAULT, related_name='server')
    enabled = models.BooleanField('Enabled', default=True, help_text='Is this peer enabled in the server config? (Will not be able to connect when disabled)')

    # Generated
    private_key = models.CharField('Private Key', max_length=128, default=None, null=True, blank=True)
    public_key = models.CharField('Public Key', max_length=128, default=None, null=True, blank=True)
    config = models.TextField('WireGuard Config', max_length=512, default='', blank=True, help_text='This is regenerated every time on save.')
    qr = models.ImageField('QR Code', null=True, blank=True)

    # Server side
    address = models.GenericIPAddressField('IPv4 tunnel address', protocol='IPv4', null=True, blank=True, help_text='Local IPv4 address within VPN subnet this client will have (eg. 10.13.0.x)')
    address6 = models.GenericIPAddressField('IPv6 tunnel address', protocol='IPv6', null=True, blank=True, help_text='Local IPv6 address within VPN subnet this client will have')
    dns = models.CharField('DNS (comma separated)', max_length=256, null=True, blank=True, help_text='DNS servers this client will use.',)

    # Peer side
    allowed_ips = models.CharField('Allowed IPs', max_length=128, default='0.0.0.0/0', help_text='IP addresses that will use the tunnel interface (defaults to all)')
    keepalive = models.IntegerField('Persistent Keepalive', null=True, blank=True, help_text='Keep Alive interval to maintain the tunnel connection.  Optional.')

    def __str__(self):
        return f'({self.id}) Wireguard user {self.user.username}'

    def generate_config(self):
        # Build config
        interface = f'[Interface]\n' \
                    f'PrivateKey = {self.private_key}\n' \
                    f'Address = {self.address}\n'
        if self.dns and len(self.dns) > 0:
            interface += f'DNS = {self.dns}\n' if self.dns else ''
        peer = f'\n[Peer]\n' \
               f'PublicKey = {self.server.public_key}\n' \
               f'AllowedIPs = {self.allowed_ips}\n' \
               f'Endpoint = {self.server.wan}:{self.server.port}\n'
        if self.keepalive:
             peer += f'PersistentKeepalive = {self.keepalive}'
        config = interface + peer
        return config

    def save(self, *args, **kwargs):
        if not self.private_key:
            self.private_key, self.public_key = generate_keypair()

        # Assign an IPv4 address to this client (50 attempts)
        if not self.address:
            attempts = 0
            while attempts < 50:
                self.address = dhcp(self.server.address, self.server.subnet)
                attempts += 1
                # Stop making addresses if not taken
                if not WireguardPeer.objects.filter(address=self.address).first():
                    break

        if not self.dns or len(self.dns) == 0:
            self.dns = self.server.address

        self.config = self.generate_config()

        """
        [Interface]
        PrivateKey = asdf
        Address = 10.49.0.2 ,2001:db8:a160::2
        DNS =  172.21.227.16, fd00::5:e310 
        
        [Peer]
        PublicKey = asdf
        PresharedKey = asdf
        AllowedIPs = 0.0.0.0/0,::/0
        Endpoint = external_ipv4:51820
        PersistentKeepalive = 25
        """

        # Generate QR code
        img = qrcode.make(self.config)
        img_bytes = BytesIO()
        img.save(img_bytes, format='PNG')
        self.qr.save(f'qr-{self.user.username}.png', File(img_bytes), save=False)
        # Save model
        super().save()


@receiver(post_save, sender=AUTH_USER_MODEL)
def update_profile_signal(sender, instance, created, **kwargs):
    """
    Creates a wireguard profile when a user gets created

    :param sender The AUTH_USER_MODEL class
    :param instance the instance of the user being created
    :param created returned when the user was created, not updated.
    """
    if created:
        wg = WireguardPeer.objects.create(user=instance)
        wg.save()

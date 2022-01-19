import subprocess

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from api.logging import log
from api.models import UUIDModel
from api.utils import generate_keypair, get_external_ip


def create_default_server(apps, schema_editor):
    """
    @param apps The installed apps this migration references
    @param schema_editor The current schema this migration references
    """
    WireguardServer = apps.get_model('letsvpn', 'WireguardServer')

    db_alias = schema_editor.connection.alias
    WireguardServer.objects.using(db_alias).bulk_create([WireguardServer()])


def delete_default_server():
    """
    This function doesn't need to do anything, since reversing this migration would drop the table.
    """
    pass


class WireguardServer(UUIDModel):
    class Meta:
        verbose_name = 'WireGuard Server'
        verbose_name_plural = 'WireGuard Servers'

    name = models.CharField('Interface Name', max_length=32, default='wg0', unique=True)
    default = models.BooleanField('Default Server', default=False, help_text='Default server when creating new peers.')
    enabled = models.BooleanField('Enabled', default=True, help_text='Is this server enabled? (Will not start server when disabled)')

    # Generated
    wan = models.GenericIPAddressField('Public IPv4 Address', null=True, blank=True, help_text='AUTOFILLED: Public (WAN) IPv4 address for this server')
    wan6 = models.GenericIPAddressField('Public IPv6 Address', null=True, blank=True, help_text='AUTOFILLED: Public (WAN) IPv6 address for this server')
    private_key = models.CharField('Private Key', max_length=128, default=None, null=True, blank=True)
    public_key = models.CharField('Public Key', max_length=128, default=None, null=True, blank=True)
    config = models.TextField('Server config (generated)', max_length=25565, default='', blank=True)

    # [Interface]
    address = models.CharField('Server IPv4 address', max_length=128, unique=True, default='10.13.0.1', null=False, blank=False, help_text='Address of the tunnel server.  (Default: 10.13.0.1)')
    subnet = models.IntegerField('IPv4 Tunnel Subnet Mask', default=16, validators=[MinValueValidator(1), MaxValueValidator(31)], help_text='Subnet bits of the v4 tunnel.  (Default: 16)')
    address6 = models.CharField('Server IPv6 address', max_length=128, unique=True, null=True, blank=True, help_text='IPv6 address of the tunnel server.')
    subnet6 = models.IntegerField('IPv6 Tunnel Subnet Mask', default=64, validators=[MinValueValidator(1), MaxValueValidator(127)], help_text='Subnet bits of the v6 tunnel.  (Default: 64)')
    port = models.IntegerField('Listen Port', default=51820, null=False, blank=False, validators=[MinValueValidator(1000), MaxValueValidator(65535)], help_text='Port for the server to listen on.')

    @staticmethod
    def get_default():
        default = WireguardServer.objects.filter(default=True).first()
        if not default:
            default = WireguardServer.objects.create(default=True)
            default.save()
        return default

    def generate_config(self):
        # Build config
        """
        [Interface]
        Address = 10.49.0.1/16 ,2001:db8:a160::1/48
        ListenPort = 51820
        PrivateKey = adsf

        [Peer]
        # cclloyd
        PublicKey = asdf
        AllowedIPs = 10.49.0.2/32,2001:db8:a160::2/128
        """
        from letsvpn.WireguardPeer.models import WireguardPeer

        # Build config
        config = '[Interface]\n' \
                 f'Address = {self.address}/{self.subnet}\n' \
                 f'ListenPort = {self.port}\n' \
                 f'PrivateKey = {self.private_key}\n\n'

        peers = WireguardPeer.objects.filter(server=self)
        log.debug('Peers')
        log.debug(peers)
        for peer in peers:
            text = f'\n[Peer]\n' \
                 f'PublicKey = {self.public_key}\n' \
                 f'AllowedIPs = {peer.address}/32\n'
            if peer.keepalive:
                text += f'PersistentKeepalive = {peer.keepalive}\n'
            config = f'{config}{text}'
        return config

    def __str__(self):
        return f'({self.id}) WireGuard settings for {self.name}'

    def save(self, *args, **kwargs):
        default = WireguardServer.objects.filter(default=True).first()
        # Set current server to default if no default exists
        if not default:
            self.default = True
        # Prevent deleting or removing default status from default server
        else:
            if self.default and self.id != default.id:
                raise ValidationError('There can only be one default WireguardServer object.')

        if not self.private_key:
            self.private_key, self.public_key = generate_keypair()

        if not self.wan:
            self.wan, self.wan6 = get_external_ip()

        self.config = self.generate_config()
        super().save()

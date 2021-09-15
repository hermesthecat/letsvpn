from django.db import models

from api.models import UUIDModel


class WireguardPeer(UUIDModel):

    name = models.CharField('Interface Name', max_length=32, default='wg0-peer')
    address = models.CharField('Server address/subnet', max_length=128, default='10.13.13.0/24', null=False, blank=False)
    port = models.IntegerField('Listen Port', default=51820, null=False, blank=False)
    private_key = models.CharField('Private Key', max_length=128, default=None, null=True, blank=True)
    public_key = models.CharField('Public Key', max_length=128, default=None, null=True, blank=True)
    allowed_ips = models.CharField('Allowed IPs', max_length=128, default='0.0.0.0/0', null=False, blank=False)
    keepalive = models.IntegerField('Persistent Keepalive', null=True, blank=True)

    def __str__(self):
        text = f' for {self.name}' if self.name else ''
        return f'({self.id}) Wireguard peer{text}'

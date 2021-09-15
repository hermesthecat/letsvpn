import subprocess

from django.db import models

from api.models import UUIDModel


class WireguardSettings(UUIDModel):

    name = models.CharField('Interface Name', max_length=32, default='wg0')
    address = models.CharField('Server address/subnet', max_length=128, default='10.13.13.0/24', null=False, blank=False)
    port = models.IntegerField('Listen Port', default=51820, null=False, blank=False)
    private_key = models.CharField('Private Key', max_length=128, default=None, null=True, blank=True)
    public_key = models.CharField('Public Key', max_length=128, default=None, null=True, blank=True)
    dns1 = models.GenericIPAddressField('Primary DNS', max_length=32, default='1.1.1.1', null=True, blank=True)
    dns2 = models.GenericIPAddressField('Secondary DNS', max_length=32, null=True, blank=True)

    def __str__(self):
        return f'({self.id}) Wireguard settings for {self.name}'

    def save(self, *args, **kwargs):
        if not self.private_key:
            private_process = subprocess.Popen(['wg', 'genkey'], stdout=subprocess.PIPE)
            private = private_process.stdout.read().decode('utf-8').strip()

            public_process = subprocess.run(['wg', 'genkey'], stdout=subprocess.PIPE, stdin=private_process.stdout)
            public = public_process.stdout.decode('utf-8').strip()

            self.private_key = private
            self.public_key = public
        super().save()
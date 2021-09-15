import subprocess
from io import BytesIO

from django.core.files import File
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import qrcode

from api.models import UUIDModel
from api.settings import AUTH_USER_MODEL


class WireguardUser(UUIDModel):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wireguard")

    address = models.CharField('Server address/subnet', max_length=128, default='10.13.13.0/24', null=False, blank=False)
    port = models.IntegerField('Listen Port', default=51820, null=False, blank=False)
    private_key = models.CharField('Private Key', max_length=128, default=None, null=True, blank=True)
    public_key = models.CharField('Public Key', max_length=128, default=None, null=True, blank=True)
    allowed_ips = models.CharField('Allowed IPs', max_length=128, default='0.0.0.0/0', null=False, blank=False)
    keepalive = models.IntegerField('Persistent Keepalive', null=True, blank=True)
    qr = models.ImageField('QR Code', null=True, blank=True)

    def __str__(self):
        return f'({self.id}) Wireguard user {self.user.username}'

    def generate_qr(self):
        config = '[Server]' \
                 f'PrivateKey = {self.private_key}'
        import qrcode
        img = qrcode.make(config)
        #type(img)  # qrcode.image.pil.PilImage
        #img.save("some_file.png")
        img_io = BytesIO(img)
        #self.image_field.save(img_io, File(img_io))

    def save(self, *args, **kwargs):
        # Build config
        config = '[Server]' \
                 f'PrivateKey = {self.private_key}'

        try:
            # Generate QR code
            img = qrcode.make(config)
            img_bytes = BytesIO()
            img.save(img_bytes, format='PNG')
            self.qr.save(f'qr-{self.user.username}.png', File(img_bytes), save=False)
        except:
            pass
        # Save model
        super().save()


@receiver(post_save, sender=AUTH_USER_MODEL)
def update_profile_signal(sender, instance, created, **kwargs):
    """
    Creates a profile when a user gets created

    :param sender The AUTH_USER_MODEL class
    :param instance the instance of the user being created
    :param created returned when the user was created, not updated.
    """
    if created:
        wg = WireguardUser.objects.create(user=instance)

        private_process = subprocess.Popen(['wg', 'genkey'], stdout=subprocess.PIPE)
        private = private_process.stdout.read().decode('utf-8').strip()

        public_process = subprocess.run(['wg', 'genkey'], stdout=subprocess.PIPE, stdin=private_process.stdout)
        public = public_process.stdout.decode('utf-8').strip()

        wg.private_key = private
        wg.public_key = public
        wg.save()

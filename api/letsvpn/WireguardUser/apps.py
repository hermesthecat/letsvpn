from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WireguardUserConfig(AppConfig):
    name = 'letsvpn.WireguardUser'
    verbose_name = _('WireGuard Users')

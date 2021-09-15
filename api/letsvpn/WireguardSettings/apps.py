from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WireguardSettingsConfig(AppConfig):
    name = 'letsvpn.WireguardSettings'
    verbose_name = _('WireGuard Settings')

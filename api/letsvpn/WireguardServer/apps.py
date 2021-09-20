from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WireguardServerConfig(AppConfig):
    name = 'letsvpn.WireguardServer'
    verbose_name = _('WireGuard Server')

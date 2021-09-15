from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WireguardPeerConfig(AppConfig):
    name = 'letsvpn.WireguardPeer'
    verbose_name = _('WireGuard Peers')

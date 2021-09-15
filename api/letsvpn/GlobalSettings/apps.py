from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class GlobalSettingsConfig(AppConfig):
    name = 'letsvpn.GlobalSettings'
    verbose_name = _('Global App Settings')

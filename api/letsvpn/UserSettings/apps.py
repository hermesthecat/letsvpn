from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UserSettingsConfig(AppConfig):
    name = 'letsvpn.UserSettings'
    verbose_name = _('Individual User Settings')

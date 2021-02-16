from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MyAppProfileConfig(AppConfig):
    name = 'myapp.MyAppProfile'
    verbose_name = _('MyApp Profiles')

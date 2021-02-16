from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MyAppConfig(AppConfig):
    name = 'myapp'
    verbose_name = _('My App')

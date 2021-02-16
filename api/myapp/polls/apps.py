from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class PollsConfig(AppConfig):
    name = 'myapp.polls'
    verbose_name = _('Polls')

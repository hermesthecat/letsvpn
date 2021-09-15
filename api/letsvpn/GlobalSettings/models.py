from django.db import models

from api.models import UUIDModel


class GlobalSettings(UUIDModel):

    autogen_config = models.BooleanField('Auto-generate Wireguard Configs', default=True, null=False, blank=False)
    # TODO: Add ldap configs here

    def __str__(self):
        return f'({self.id}) Global settings object'


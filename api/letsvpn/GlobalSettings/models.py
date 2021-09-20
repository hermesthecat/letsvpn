from django.core.exceptions import ValidationError
from django.db import models

from api.models import UUIDModel


def create_settings(apps, schema_editor):
    """
    Creates a profile for every existing user.
    Any models referenced muse by through apps.get_model(APP<str>, MODEL<str>)
    If you import the models directly, you'll get the wrong version and the migration will fail.

    @param apps The installed apps this migration references
    @param schema_editor The current schema this migration references
    """
    GlobalSettings = apps.get_model('letsvpn', 'GlobalSettings')

    db_alias = schema_editor.connection.alias
    GlobalSettings.objects.using(db_alias).bulk_create([GlobalSettings()])


def delete_settings():
    """
    This function doesn't need to do anything, since reversing this migration would drop the table.
    """
    pass


class GlobalSettings(UUIDModel):
    class Meta:
        verbose_name = 'LetsVPN Settings'
        verbose_name_plural = 'LetsVPN Settings'

    autogen_config = models.BooleanField('Auto-generate Wireguard Configs', default=True, null=False, blank=False)
    # TODO: Add ldap configs here

    def save(self, *args, **kwargs):
        if not self.pk and GlobalSettings.objects.exists():
            raise ValidationError('There can only be one GlobalSettings object.')
        self.save()

    def __str__(self):
        return f'({self.id}) Global settings object'


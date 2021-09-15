from django.contrib import admin

from .models import WireguardUser


class UserSettingsInline(admin.StackedInline):
    model = WireguardUser
    verbose_name_plural = 'WireGuard Users'


# Register models in the admin interface.
admin.site.register(WireguardUser)


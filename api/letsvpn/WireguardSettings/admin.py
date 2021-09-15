from django.contrib import admin

from .models import WireguardSettings


# Define the inline instance used in the User admin field
class UserSettingsInline(admin.StackedInline):
    model = WireguardSettings
    can_delete = False
    verbose_name_plural = 'WireGuard Settings'


# Register models in the admin interface.
admin.site.register(WireguardSettings)


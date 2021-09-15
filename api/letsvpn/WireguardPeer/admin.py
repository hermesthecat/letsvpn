from django.contrib import admin

from .models import WireguardPeer


class UserSettingsInline(admin.StackedInline):
    model = WireguardPeer
    verbose_name_plural = 'WireGuard Peers'


# Register models in the admin interface.
admin.site.register(WireguardPeer)


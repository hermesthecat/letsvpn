from django.contrib import admin

from .models import WireguardServer
from ..WireguardPeer.admin import WireguardPeerInline


class WireguardServerAdmin(admin.ModelAdmin):
    model = WireguardServer
    verbose_name_plural = 'WireGuard Servers'
    readonly_fields = ['config', 'public_key', 'private_key']
    inlines = (
        WireguardPeerInline,
    )
    fieldsets = (
        ('Server Settings', {
            'fields': ('name', 'default', 'enabled', 'port', 'public_key', 'private_key')
        }),
        ('IPv4 Configuration', {
            'fields': ('wan', 'address', 'subnet')
        }),
        ('IPv6 Configuration', {
            'fields': ('wan6', 'address6', 'subnet6')
        }),
        ('Config File (generated on save)', {
            'fields': ('config',)
        })
    )



# Register models in the admin interface.
admin.site.register(WireguardServer, WireguardServerAdmin)


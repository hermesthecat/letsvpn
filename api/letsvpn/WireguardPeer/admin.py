from django.contrib import admin

from .models import WireguardPeer


class WireguardPeerAdmin(admin.ModelAdmin):
    model = WireguardPeer
    readonly_fields = ['config', 'public_key', 'private_key', 'qr', ]
    fieldsets = (
        ('Peer Settings', {
            'fields': ('user', 'enabled')
        }),
        ('WireGuard Settings', {
            'fields': ('server', 'keepalive', 'public_key', 'private_key')
        }),
        ('IP Configuration', {
            'fields': ('address', 'address6', 'dns', 'allowed_ips')
        }),
        ('Config File (generated on save)', {
            'fields': ('config', 'qr')
        })
    )


class WireguardPeerInline(admin.TabularInline):
    model = WireguardPeer
    fields = [
        'user',
        'address',
        'address6',
        'enabled',
    ]
    readonly_fields = ['user', 'address', 'address6']


# Register models in the admin interface.
admin.site.register(WireguardPeer, WireguardPeerAdmin)

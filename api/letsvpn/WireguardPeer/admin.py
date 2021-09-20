from django.contrib import admin

from .models import WireguardPeer


class WireguardPeerAdmin(admin.ModelAdmin):
    model = WireguardPeer
    readonly_fields = ['config', 'public_key', 'private_key', 'qr', ]


class WireguardPeerInline(admin.TabularInline):
    model = WireguardPeer
    fields = [
        'user',
        'address',
        'address6',
    ]
    readonly_fields = ['user', 'address', 'address6']


# Register models in the admin interface.
admin.site.register(WireguardPeer, WireguardPeerAdmin)

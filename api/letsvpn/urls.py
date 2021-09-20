from rest_framework import routers

from .WireguardPeer.viewsets import WireguardPeerViewSet

router = routers.SimpleRouter()

router.register(r'^api/wg/users', WireguardPeerViewSet, 'wireguarduser')


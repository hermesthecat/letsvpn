from rest_framework import routers

from .WireguardPeer.viewsets import WireguardPeerViewSet
from .WireguardServer.viewsets import WireguardServerViewSet

router = routers.SimpleRouter()

router.register(r'^api/wg/peers', WireguardPeerViewSet, 'wg_peers')
router.register(r'^api/wg/servers', WireguardServerViewSet, 'wg_servers')


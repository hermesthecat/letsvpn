from time import sleep

from rest_framework import viewsets, mixins
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from api.models import User
from api.serializers import UserSerializer, UserPublicSerializer
from api.settings import AUTH_USER_MODEL
from .serializers import WireguardPeerSerializer, WireguardPeerSerializerPublic
from .models import WireguardPeer
from ..WireguardServer.models import WireguardServer
from ..WireguardServer.serializers import WireguardServerSerializerPublic


class WireguardPeerViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
    ):

    queryset = WireguardPeer.objects.all()
    serializer_class = WireguardPeerSerializer

    @staticmethod
    def deep_populate(peer, user):
        if user.is_staff:
            serializer = WireguardPeerSerializer
        else:
            serializer = WireguardPeerSerializerPublic

        data = serializer(peer, many=False).data
        if data['user'] == user.id or user.is_staff:
            userializer = UserSerializer
        else:
            userializer = UserPublicSerializer
        udata = userializer(User.objects.filter(id=data['user']).first(), many=False).data
        data['user'] = udata
        data['server'] = WireguardServerSerializerPublic(WireguardServer.objects.filter(id=data['server']).first(), many=False).data
        return data

    def list(self, request):
        user = request.user
        peers = list()
        for peer in self.queryset:
            peers.append(WireguardPeerViewSet.deep_populate(peer, user))
        return Response(peers)

    @action(methods=['GET'], detail=True)
    def toggle(self, request, pk=None):
        user = request.user
        peer = WireguardPeer.objects.get(pk=pk)
        if user.id != peer.user.id and not user.is_superuser:
            raise PermissionDenied('You can only edit your own profile if you are not an admin.')
        peer.enabled = not peer.enabled
        peer.save()
        return Response(WireguardPeerViewSet.deep_populate(peer, user))



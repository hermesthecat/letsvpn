from time import sleep

import ldap
from rest_framework import viewsets, mixins
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from api.logging import log
from api.models import User
from api.serializers import UserSerializer, UserPublicSerializer
from api.settings.auth import *
from .serializers import WireguardServerSerializer, WireguardServerSerializerPublic
from .models import WireguardServer


class WireguardServerViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
    ):

    queryset = WireguardServer.objects.all()
    serializer_class = WireguardServerSerializer

    def list(self, request):
        sleep(1)
        user = request.user

        if user.is_staff or user.is_superuser:
            Serializer = WireguardServerSerializer
        else:
            Serializer = WireguardServerSerializerPublic
        return Response(Serializer(self.queryset, many=True).data)
        servers = list()
        for server in self.queryset:
            servers.append(WireguardServerViewSet.deep_populate(server, user))
        return Response(servers)

    @action(methods=['GET'], detail=True)
    def toggle(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)
        if user.id != server.user.id and not user.is_superuser:
            raise PermissionDenied('You can only edit your own profile if you are not an admin.')
        server.enabled = not server.enabled
        server.save()
        return Response(WireguardServerViewSet.deep_populate(server, user))

from time import sleep
import subprocess
import ldap
from rest_framework import viewsets, mixins
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from api.logging import log
from api.models import User
from api.serializers import UserSerializer, UserPublicSerializer
from api.settings import WG_COMMAND, WGQ_COMMAND
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

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def status(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)
        result = subprocess.run(WG_COMMAND, stdout=subprocess.PIPE).stdout.decode('utf-8')

        return Response(result, status=201)

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def start(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)

        # Update config before starting
        server.config = server.generate_config()
        server.save()

        result = subprocess.run([*WGQ_COMMAND, 'up', server.name], stdout=subprocess.PIPE).stdout.decode('utf-8')
        return Response(result, status=200)

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def stop(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)
        result = subprocess.run([*WGQ_COMMAND, 'down', server.name], stdout=subprocess.PIPE).stdout.decode('utf-8')
        return Response(result, status=200)

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def restart(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)

        # Update config before starting
        server.config = server.generate_config()
        server.save()

        all_result = ''
        all_result += '\nSTOPPING SERVER\n'
        all_result += subprocess.run([*WGQ_COMMAND, 'down', server.name], stdout=subprocess.PIPE).stdout.decode('utf-8')
        all_result += '\nSTARTING SERVER\n'
        all_result += subprocess.run([*WGQ_COMMAND, 'up', server.name], stdout=subprocess.PIPE).stdout.decode('utf-8')
        return Response(all_result, status=200)

    @action(methods=['GET'], detail=True, permission_classes=[AllowAny])
    def toggle(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)
        server.enabled = not server.enabled
        server.save()
        return Response(WireguardServerSerializer(server, many=False).data)

    @action(methods=['GET'], detail=True, permission_classes=[AllowAny])
    def rebuild(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)

        server.config = server.generate_config()
        server.save()
        return Response(WireguardServerSerializer(server, many=False).data)

import subprocess
from pathlib import Path

from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from api.logging import log
from api.settings import WG_COMMAND, WGQ_COMMAND, MEDIA_ROOT
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

    @staticmethod
    def deep_populate(servers, user, many=False):
        if user.is_staff:
            serializer = WireguardServerSerializer
        else:
            serializer = WireguardServerSerializerPublic
        return serializer(servers, many=many)

    def list(self, request):
        user = request.user

        WireguardServer.get_default()

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

        # Write server config to file for wireguard
        filename = Path(MEDIA_ROOT) / 'wg-conf' / f'{server.id}.conf'
        filename.parent.mkdir(exist_ok=True, parents=True)
        with open(str(filename.resolve()), 'w') as f:
            f.write(server.config)

        # Run command to start tunnel
        command = [*WGQ_COMMAND, 'up', str(filename.resolve())]
        log.debug(f'Starting server {server.id}...')
        log.debug(command)
        start = subprocess.run(command, stdout=subprocess.PIPE).stdout.decode('utf-8')
        log.debug(start)

        status = subprocess.run(WG_COMMAND, stdout=subprocess.PIPE).stdout.decode('utf-8')
        return Response(status, status=200)

    @action(methods=['GET'], detail=False)
    def autostart(self, request, pk=None):
        servers = WireguardServer.objects.filter(enabled=True)
        data = []
        for server in servers:
            # Write server config to file for wireguard
            filename = Path(MEDIA_ROOT) / 'wg-conf' / f'{server.id}.conf'
            filename.parent.mkdir(exist_ok=True, parents=True)
            with open(str(filename.resolve()), 'w') as f:
                f.write(server.config)

            # Run command to start tunnel
            command = [*WGQ_COMMAND, 'up', str(filename.resolve())]
            log.debug(f'Starting server {server.id}...')
            log.debug(command)
            result = subprocess.run(command, stdout=subprocess.PIPE)
            data.append(result.returncode)
        return Response(data)

    @action(methods=['GET'], detail=False)
    def autorestart(self, request):
        servers = WireguardServer.objects.filter(enabled=True)
        data = []
        for server in servers:
            # Write server config to file for wireguard
            filename = Path(MEDIA_ROOT) / 'wg-conf' / f'{server.id}.conf'
            filename.parent.mkdir(exist_ok=True, parents=True)
            with open(str(filename.resolve()), 'w') as f:
                f.write(server.config)

            # Run command to stop tunnel
            command = [*WGQ_COMMAND, 'down', str(filename.resolve())]
            log.debug(f'Shutting down server {server.id}...')
            log.debug(command)
            stop = subprocess.run(command, stdout=subprocess.PIPE)

            # Run command to start tunnel
            command = [*WGQ_COMMAND, 'up', str(filename.resolve())]
            log.debug(f'Starting server {server.id}...')
            log.debug(command)
            start = subprocess.run(command, stdout=subprocess.PIPE)
            data.append((stop.returncode, start.returncode))
        return Response(data)

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def stop(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)

        filename = Path(MEDIA_ROOT) / 'wg-conf' / f'{server.id}.conf'
        filename.unlink(missing_ok=True)

        command = [*WGQ_COMMAND, 'down', str(filename.resolve())]
        log.debug(f'Shutting down server {server.id}...')
        log.debug(command)
        result = subprocess.run(command, stdout=subprocess.PIPE).stdout.decode('utf-8')
        log.debug(result)
        return Response(result, status=200)

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def restart(self, request, pk=None):
        server = WireguardServer.objects.get(pk=pk)

        # Update config before starting
        server.config = server.generate_config()
        server.save()

        # Write server config to file for wireguard
        filename = Path(MEDIA_ROOT) / 'wg-conf' / f'{server.id}.conf'
        filename.parent.mkdir(exist_ok=True, parents=True)
        with open(str(filename.resolve()), 'w') as f:
            f.write(server.config)

        log.debug(f'Restarting server {server.id}')

        # Stop the server
        down = subprocess.run([*WGQ_COMMAND, 'down', str(filename.resolve())], stdout=subprocess.PIPE)
        if down.returncode != 0:
            return Response('Error stopping server', status=202)

        # Start the server again
        up = subprocess.run([*WGQ_COMMAND, 'up', str(filename.resolve())], stdout=subprocess.PIPE)
        if up.returncode != 0:
            return Response('Error starting server', status=202)

        status = subprocess.run(WG_COMMAND, stdout=subprocess.PIPE).stdout.decode('utf-8')
        return Response(status)

    @action(methods=['GET'], detail=True, permission_classes=[IsAdminUser])
    def toggle(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)
        server.enabled = not server.enabled
        server.save()
        return Response(WireguardServerSerializer(server, many=False).data)

    @action(methods=['GET'], detail=True)
    def rebuild(self, request, pk=None):
        user = request.user
        server = WireguardServer.objects.get(pk=pk)

        server.config = server.generate_config()
        server.save()
        return Response(WireguardServerSerializer(server, many=False).data)

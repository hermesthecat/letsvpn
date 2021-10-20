import json

import requests
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
import pihole as ph

#from myapp.MyAppProfile.serializers import MyAppProfileSerializer
from api.models import User
from api.settings import PI_PASSWORD, PI_IP


class ExtendedPiHole(ph.PiHole):

    def __init__(self, ip, *args, **kwargs):
        super().__init__(ip)
        self.authenticate(PI_PASSWORD)

    def enable(self):
        return requests.get(f'http://{self.ip_address}/admin/api.php?enable&auth={self.auth_data.token}').json()
    
    def disable(self, seconds=60):
        return requests.get(f'http://{self.ip_address}/admin/api.php?disable={str(seconds)}&auth={self.auth_data.token}').json()


class PiHoleViewSet(
    viewsets.ViewSet,
):
    queryset = User.objects.all()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pihole = ExtendedPiHole(PI_IP)

    @action(methods=['get'], detail=False)
    def version(self, request):
        return Response(self.pihole.getVersion())

    @action(methods=['post'], detail=False)
    def enable(self, request):
        return Response(self.pihole.enable())

    @action(methods=['post'], detail=False)
    def disable(self, request):
        return Response(self.pihole.disable(seconds=10))


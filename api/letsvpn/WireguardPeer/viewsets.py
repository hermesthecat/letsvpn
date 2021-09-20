from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from api.models import User
from api.serializers import UserSerializer, UserPublicSerializer
from api.settings import AUTH_USER_MODEL
from .serializers import WireguardPeerSerializer, WireguardPeerSerializerPublic
from .models import WireguardPeer


class WireguardPeerViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
    ):

    queryset = WireguardPeer.objects.all()
    serializer_class = WireguardPeerSerializer

    def list(self, request):
        user = request.user

        if user.is_staff:
            serializer = WireguardPeerSerializer
        else:
            serializer = WireguardPeerSerializerPublic

        profiles = list()
        for profile in self.queryset:
            data = serializer(profile, many=False).data
            if data['user'] == user.id:
                userializer = UserSerializer
            else:
                userializer = UserPublicSerializer
            udata = userializer(User.objects.filter(id=data['user']).first(), many=False).data
            print(udata)
            print(data['user'])
            data['user'] = udata
            profiles.append(data)
        return Response(profiles)



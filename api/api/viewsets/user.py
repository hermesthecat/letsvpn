from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

#from myapp.MyAppProfile.serializers import MyAppProfileSerializer
from api.models import User
from ..serializers import UserSerializer


class UserViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        return Response(status=403)

    @action(methods=['get'], detail=False)
    def me(self, request):
        user = request.user
        user_data = self.get_serializer(user, many=False).data

        #profile = request.user.discord_profile
        #profile_data = MyAppProfileSerializer(profile, many=False).data

        #all_data = {**profile_data, **user_data, 'discord_id': f'{profile.discord_id}'}
        all_data = {**user_data}

        return Response(all_data)


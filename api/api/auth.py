from django.contrib.auth.backends import BaseBackend
from api.models import User
from rest_framework.authtoken.models import Token


class TokenBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, token=None):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return None
        check_token = Token.objects.filter(user=user, key=password).exists()
        if check_token:
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

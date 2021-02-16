from rest_framework import views, serializers, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAdminUser

from api.serializers import UserSerializer
from .models import MyAppProfile


class MyAppProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyAppProfile
        fields = '__all__'

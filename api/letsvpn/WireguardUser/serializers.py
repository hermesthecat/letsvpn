from rest_framework import serializers
from .models import WireguardUser


class WireguardUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WireguardUser
        fields = '__all__'

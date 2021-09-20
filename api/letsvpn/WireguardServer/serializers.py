from rest_framework import serializers
from .models import WireguardServer


class WireguardServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = WireguardServer
        fields = '__all__'

from rest_framework import serializers
from .models import WireguardServer


class WireguardServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = WireguardServer
        fields = '__all__'


class WireguardServerSerializerPublic(serializers.ModelSerializer):
    class Meta:
        model = WireguardServer
        exclude = ['private_key', 'config']

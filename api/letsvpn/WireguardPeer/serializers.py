from rest_framework import serializers

from .models import WireguardPeer


class WireguardPeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = WireguardPeer
        fields = '__all__'


class WireguardPeerSerializerPublic(serializers.ModelSerializer):
    class Meta:
        model = WireguardPeer
        exclude = ['private_key', 'qr', 'config']

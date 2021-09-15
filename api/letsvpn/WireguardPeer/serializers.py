from rest_framework import serializers
from .models import WireguardPeer


class WireguardPeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = WireguardPeer
        fields = '__all__'

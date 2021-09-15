from rest_framework import serializers
from .models import WireguardSettings


class WireguardSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WireguardSettings
        fields = '__all__'

from rest_framework import views, serializers, status, permissions
from rest_framework.decorators import action, permission_classes
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated

from ..models import PollQuestion


class PollQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollQuestion
        fields = '__all__'
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user

        if 'duration' not in validated_data.keys():
            validated_data['duration'] = 0

        return PollQuestion.objects.create(**validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")
        user = request.user

        if not user.is_staff:
            raise PermissionDenied("You must be logged in as a staff member to modify this object")

        [setattr(instance, k, v) for k, v in validated_data.items()]
        instance.save()
        return instance

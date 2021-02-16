import asyncio

from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

from ..serializers import PollAnswerSerializer, PollQuestionSerializer
from ..models import PollAnswer


class PollAnswerViewset(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
    ):

    queryset = PollAnswer.objects.all()
    serializer_class = PollAnswerSerializer

    @action(methods=['get'], detail=True)
    def question(self, request, pk=None):
        answer = self.get_object()
        question = answer.question
        question_serializer = PollQuestionSerializer(question, many=False)
        return Response(question_serializer.data)


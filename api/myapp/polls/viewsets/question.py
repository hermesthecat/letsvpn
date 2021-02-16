from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

from ..serializers import PollAnswerSerializer, PollQuestionSerializer
from ..models import PollAnswer, PollQuestion


class PollQuestionViewset(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
    ):

    queryset = PollQuestion.objects.all()
    serializer_class = PollQuestionSerializer

    @action(methods=['get'], detail=True)
    def answers(self, request, pk=None):
        answers = PollAnswer.objects.filter(question=pk)
        answer_serializer = PollAnswerSerializer(answers, many=True)
        return Response(answer_serializer.data, status=202)

    @action(methods=['get'], detail=False)
    def all(self, request, pk=None):
        questions = PollQuestion.objects.all()
        return Response(PollQuestionSerializer(questions, many=True).data)

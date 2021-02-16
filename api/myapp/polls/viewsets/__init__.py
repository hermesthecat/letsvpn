from rest_framework import viewsets

from ..serializers import PollQuestionSerializer
from ..models import PollQuestion
from .question import PollQuestionViewset
from .answer import PollAnswerViewset


class PollsViewset(viewsets.GenericViewSet):
    queryset = PollQuestion.objects.all()
    serializer_class = PollQuestionSerializer

    # Views you don't want to go into either model's viewset would go here.


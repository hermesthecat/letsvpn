from rest_framework import routers
from .viewsets import PollsViewset, PollQuestionViewset, PollAnswerViewset

router = routers.SimpleRouter()

router.register(r'^api/polls', PollsViewset, 'soundbite')
router.register(r'^api/polls/question', PollQuestionViewset, 'soundbite_category')
router.register(r'^api/polls/answer', PollAnswerViewset, 'soundbite_soundbite')


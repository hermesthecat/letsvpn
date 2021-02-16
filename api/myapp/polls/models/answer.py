from django.db import models
from django.utils import timezone

from api.models import UUIDModel
from ..models import PollQuestion
from api.settings import AUTH_USER_MODEL


class PollAnswer(UUIDModel):
    class Meta:
        verbose_name = 'poll answer'
        verbose_name_plural = 'poll answers'

    # Assign owner to model.  By default, on delete is set to null.  You may want to change this to SET_DEFAULT.
    owner = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    # Assign a many-to-one relationship with the parent model
    question = models.ForeignKey(PollQuestion, on_delete=models.CASCADE, null=True)

    # Other fields go here
    content = models.CharField('Content', max_length=128, null=False)

    created = models.DateTimeField('Created At', default=timezone.now)
    modified = models.DateTimeField('Modified At', default=timezone.now)
    deleted = models.DateTimeField('Deleted At', default=None, null=True, blank=True)

    def __str__(self):
        return f'Answer {self.id} by {self.owner.username}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

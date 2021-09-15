from django.db import models
from django.utils import timezone

from api.models import UUIDModel
from api.settings import AUTH_USER_MODEL


class PollQuestion(UUIDModel):
    class Meta:
        verbose_name = 'poll question'
        verbose_name_plural = 'poll questions'

    # Assign owner to model.  By default, on delete is set to null.  You may want to change this to SET_DEFAULT.
    owner = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    # Other fields go here
    title = models.CharField('Title', max_length=128, null=False)

    created = models.DateTimeField('Created At', default=timezone.now)
    modified = models.DateTimeField('Modified At', default=timezone.now)
    deleted = models.DateTimeField('Deleted At', default=None, null=True, blank=True)

    def __str__(self):
        return f'Question: \'{self.title}\' by {self.owner.username}'

    def save(self, *args, **kwargs):
        # Additional save logic goes here
        super().save(*args, **kwargs)

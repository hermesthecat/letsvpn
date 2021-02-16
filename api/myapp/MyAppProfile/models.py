from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from api.models import UUIDModel
from api.settings import AUTH_USER_MODEL


class MyAppProfile(UUIDModel):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="myapp_profile")

    # Other fields for this app's profile go here

    def __str__(self):
        return f'({self.id}) MyApp Profile for {self.user.username}'


@receiver(post_save, sender=AUTH_USER_MODEL)
def update_profile_signal(sender, instance, created, **kwargs):
    """
    Creates a profile when a user gets created

    :param sender The AUTH_USER_MODEL class
    :param instance the instance of the user being created
    :param created returned when the user was created, not updated.
    """
    if created:
        MyAppProfile.objects.create(user=instance)

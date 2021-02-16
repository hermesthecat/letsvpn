from django.contrib.auth.models import AbstractUser
from django.db import IntegrityError

from api.models.uuid import UUIDField, gen_uuid


class User(AbstractUser):
    id = UUIDField()

    def save(self, *args, **kwargs):
        saved = False
        attempts = 0
        while not saved:
            try:
                super().save(*args, **kwargs)
                saved = True
            except IntegrityError:
                if attempts > 5:
                    raise RuntimeError('Max attempts reached trying to save to database.')
                attempts += 1
                self.id = gen_uuid(length=8)


from hashlib import md5

from django.contrib.auth.models import AbstractUser
from django.db import IntegrityError
from django.db.models import URLField

from api.logging import log
from api.models.uuid import UUIDField, gen_uuid


class User(AbstractUser):
    id = UUIDField()
    gravatar = URLField('Gravatar URL', null=True, blank=True)

    def save(self, *args, **kwargs):
        self.gravatar = f"https://www.gravatar.com/avatar/{md5(self.email.encode('utf-8')).hexdigest()}"
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


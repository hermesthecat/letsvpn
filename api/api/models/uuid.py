"""
This class exists because it is good security practice to not use incrementing integers for a primary key.
Using an integer as a key allows attackers/scrapers to easily guess the IDs of objects, since they are all
within a certain range.

Models inherited from this model instead of the base Django model will use a string as a primary key, and
when saved, make sure it is not already taken by another model.

By default, the length of this PK is 8 characters, giving 36^8 or 2.8 trillion possible IDs.
If you need more for some reason, you can increase the length of the field.
"""
import secrets
import string

from django.db import IntegrityError
from django.db.models import CharField, Model, Field

from api.logging import log


def gen_uuid(length: int = 8):
    return ''.join(secrets.choice([*string.ascii_letters, *string.digits]) for _ in range(length))


class UUIDField(CharField):
    description = "Unique UUID primary key for model."

    def __init__(self, max_length=8, *args, **kwargs):
        super().__init__(
            primary_key=True,
            unique=True,
            max_length=max_length,
            editable=False,
            serialize=False,
            default=gen_uuid,
        )

    def __str__(self):
        return super().__str__()


class UUIDModel(Model):
    max_length = 8
    id = UUIDField(max_length=max_length)

    class Meta:
        abstract = True

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
                self.id = gen_uuid(length=self.max_length)


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

from django.core.validators import RegexValidator
from django.db import IntegrityError
from django.db.models import CharField, Model, Field

from api.logging import log



class IPAddressField(CharField):
    description = "Valid IP address and subnet"

    base4pattern = r'(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})'
    cidr4pattern = r'(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})'
    # TODO: Add IPv6 support

    def __init__(self, cidr=False, *args, **kwargs):
        self.cidr = cidr
        super().__init__(
            max_length=19,
            editable=False,
            serialize=False,
            default='0.0.0.0/0',
            validators=RegexValidator(
                message='Enter a valid CIDR.',
                regex=self.cidr4pattern if self.cidr else self.base4pattern,
            )
        )

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        # Only include kwarg if it's not the default
        if self.cidr:
            kwargs['cidr'] = self.cidr
        return name, path, args, kwargs

    def __str__(self):
        return super().__str__()

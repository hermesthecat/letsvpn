
# TODO: Remove when chibisov/drf-extensions/issues/294 is fixed
from django.db.models.sql import datastructures
from django.core.exceptions import EmptyResultSet

datastructures.EmptyResultSet = EmptyResultSet



urlpatterns = []

from .auth import urlpatterns as auth_urls
from .api import urlpatterns as api_urls
from .django import urlpatterns as django_urls
from .apps import urlpatterns as apps_urls

urlpatterns += auth_urls
urlpatterns += api_urls
urlpatterns += django_urls
urlpatterns += apps_urls


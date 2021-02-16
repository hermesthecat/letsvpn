from django.contrib import admin
from django.urls import re_path
from rest_framework_extensions.routers import ExtendedSimpleRouter
from django.conf.urls.static import static

from ..settings import MEDIA_ROOT, MEDIA_URL, DEBUG

import api.viewsets as api_viewsets

from ..views import index

from django.contrib.staticfiles.urls import staticfiles_urlpatterns


router = ExtendedSimpleRouter()
router.register(r'^api/user', api_viewsets.UserViewSet, 'user')

# Add urls for base Django
urlpatterns = [
    re_path('^admin/', admin.site.urls),
    #re_path('', index, name='index'),
]
urlpatterns += staticfiles_urlpatterns()


urlpatterns += router.urls
urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)


# TODO: Is this needed?
# Add react urls
react_urls = [
    re_path(r'^options/?$', index),
    re_path(r'^settings/?$', index),
    re_path(r'^login/?$', index),
    re_path(r'^register/?$', index),
]

if not DEBUG:
    urlpatterns += react_urls



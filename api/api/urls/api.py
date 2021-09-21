from django.urls import path, re_path, include
from django.views import generic
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.schemas import get_schema_view

from ..settings import MEDIA_ROOT, MEDIA_URL


# Add URLs related to base API
urlpatterns = [
    re_path(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    re_path(r'^api/$', get_schema_view()),
]

# Add static files
urlpatterns += staticfiles_urlpatterns()

# Add media paths
urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)


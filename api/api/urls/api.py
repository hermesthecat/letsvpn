from django.urls import path, re_path, include
from django.views import generic
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.schemas import get_schema_view
from drf_yasg.views import get_schema_view as get_swagger_view
from drf_yasg import openapi
from rest_framework import permissions

from ..settings import MEDIA_ROOT, MEDIA_URL

#swagger_view = get_schema_view(title='LetsVPN API', renderer_classes=[OpenAPIRenderer, SwaggerUIRenderer])
swagger_view = get_swagger_view(
   openapi.Info(
      title="LetsVPN API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
# Add URLs related to base API
urlpatterns = [
    re_path(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    re_path(r'^api/$', get_schema_view()),
    re_path(r'^api/schema', swagger_view, name='docs'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', swagger_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', swagger_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', swagger_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Add static files
urlpatterns += staticfiles_urlpatterns()

# Add media paths
urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)


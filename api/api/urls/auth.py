from django.urls import re_path, include
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# Add URLs related to authentication
urlpatterns = [
    re_path(r'^api-auth/', include('rest_framework.urls')),
    re_path(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework_auth')),
    re_path(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    re_path(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),

]


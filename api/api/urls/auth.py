from django.urls import re_path, include
from django.conf.urls.static import static
from django_pam.accounts.views import LoginView, LogoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from ..views import exchange_token


# Add URLs related to authentication
urlpatterns = [
    re_path(r'^api-auth/', include('rest_framework.urls')),
    re_path(r'^social/(?P<backend>[^/]+)/', exchange_token),
    re_path(r'^pam/login/$', LoginView.as_view(), name='login'),
    re_path(r'^pam/logout/$', LogoutView.as_view(), name='logout'),
    re_path(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework_auth')),
    re_path(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    re_path(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),

]


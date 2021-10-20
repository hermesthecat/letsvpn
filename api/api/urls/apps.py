from django.urls import re_path
from rest_framework_extensions.routers import ExtendedSimpleRouter

from api.viewsets import UserViewSet


# Import all your app's url routers here
from api.viewsets.pihole import PiHoleViewSet
from letsvpn.urls import router as letsvpn_router

urlpatterns = []
router = ExtendedSimpleRouter()


# Register global URLs here
router.register(r'^api/user', UserViewSet, 'user')
router.register(r'^api/pi', PiHoleViewSet, 'pihole')

urlpatterns += router.urls


# Register all your app's url routers here
urlpatterns += letsvpn_router.urls






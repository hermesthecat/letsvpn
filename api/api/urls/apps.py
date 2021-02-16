from rest_framework_extensions.routers import ExtendedSimpleRouter

from api.viewsets import UserViewSet

# Import all your app's url routers here
from myapp.polls.urls import router as myapp_router

urlpatterns = []
router = ExtendedSimpleRouter()


# Register global URLs here
router.register(r'^api/user', UserViewSet, 'user')
urlpatterns += router.urls


# Register all your app's url routers here
urlpatterns += myapp_router.urls


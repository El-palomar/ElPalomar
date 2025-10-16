#backend/profesores/urls.py
from rest_framework import routers
from .views import ProfesorViewSet

router = routers.DefaultRouter()
router.register(r'profesores',ProfesorViewSet)

urlpatterns = router.urls
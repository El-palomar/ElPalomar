#backend/actividades/urls.py
from rest_framework import routers
from .views import ActividadViewSet

router = routers.DefaultRouter()
router.register(r'actividades', ActividadViewSet)

urlpatterns = router.urls
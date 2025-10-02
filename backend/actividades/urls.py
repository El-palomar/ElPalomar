#backend/actividades/urls.py
from rest_framework import routers
from .views import ActividadesViewset

router = routers.DefaultRouter()
router.register(r'actividades', ActividadesViewset)

urlpatterns = router.urls
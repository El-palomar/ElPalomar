#backend/comisiones/urls.py
from rest_framework import routers
from .views import ComisionViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'comisiones', ComisionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
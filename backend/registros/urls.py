#backend/registros/urls.py
from rest_framework.routers import DefaultRouter
from .views import RegistroViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'registros', RegistroViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
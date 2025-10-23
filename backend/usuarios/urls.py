# usuarios/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegistroView, LoginView, UsuarioViewSet

# Router para CRUD de usuarios (solo admin)
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = [
    # Registro y login
    path("registro/", RegistroView.as_view(), name="registro"),
    path("login/", LoginView.as_view(), name="login"),
    
    # Endpoints CRUD de usuarios
    path("", include(router.urls)),
]

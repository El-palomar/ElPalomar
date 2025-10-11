# usuarios/views.py
from rest_framework import generics, viewsets, permissions
from .serializers import RegistroSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Usuario


# --- Registro de nuevos usuarios ---
class RegistroView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    permission_classes = [AllowAny]


# --- Inicio de sesión con JWT ---
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# --- CRUD de usuarios (solo para administradores) ---
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

    # Permisos según la acción
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            # Solo administradores pueden listar, ver, editar o eliminar usuarios
            return [permissions.IsAdminUser()]
        elif self.action == 'create':
            # Cualquiera puede registrarse
            return [permissions.AllowAny()]
        return super().get_permissions()

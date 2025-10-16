# usuarios/views.py
from rest_framework import generics, viewsets
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


# --- CRUD de usuarios ---
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

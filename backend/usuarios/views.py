# usuarios/views.py
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from django.contrib.auth import authenticate
from .serializers import RegistroSerializer
from .models import Usuario


# --- Registro de nuevos usuarios ---
class RegistroView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    permission_classes = [AllowAny]

# --- Login simple sin JWT ---
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Credenciales incorrectas")
        data['user'] = user
        return data

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response({
            "id": user.id,
            "nombre": user.nombre,
            "apellido": user.apellido,
            "email": user.email,
            "tipo": user.tipo,
        })

# --- CRUD de usuarios ---
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

# usuarios/serializers.py
from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])

    class Meta:
        model = Usuario
        fields = ["id", "dni", "nombre", "apellido", "email", "telefono", "sexo", "edad", "tipo", "is_active", "password"]  # ✅ Agregar password
        read_only_fields = ["id"]
        extra_kwargs = {
            'password': {'write_only': True}  
        }

    def create(self, validated_data):
        usuario = Usuario.objects.create(
            dni=validated_data["dni"],
            nombre=validated_data["nombre"],
            apellido=validated_data["apellido"],
            email=validated_data["email"],
            telefono=validated_data.get("telefono"),
            sexo=validated_data.get("sexo", ""),
            edad=validated_data.get("edad"),
        )
        if 'password' in validated_data:
            usuario.set_password(validated_data["password"])
        usuario.save()
        return usuario

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Cambiar el campo de username a email
    username_field = 'email'
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["nombre"] = user.nombre
        token["apellido"] = user.apellido
        token["tipo"] = user.tipo
        return token

    def validate(self, attrs):
        # Llamar al validate del padre con email como username
        data = super().validate(attrs)
        
        # Agregar información del usuario a la respuesta
        data['user'] = {
            'id': self.user.id,
            'nombre': self.user.nombre,
            'apellido': self.user.apellido,
            'email': self.user.email,
            'tipo': self.user.tipo,
        }
        
        return data
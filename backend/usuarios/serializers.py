# usuarios/serializers.py
from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Usuario
        fields = ["dni", "nombre", "apellido", "email", "telefono", "sexo", "edad", "password"]

    def create(self, validated_data):
        usuario = Usuario.objects.create(
            dni=validated_data["dni"],
            nombre=validated_data["nombre"],
            apellido=validated_data["apellido"],
            email=validated_data["email"],
            telefono=validated_data.get("telefono"),
            sexo=validated_data["sexo"],
            edad=validated_data.get("edad"),
        )
        usuario.set_password(validated_data["password"])
        usuario.save()
        return usuario
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["nombre"] = user.nombre
        token["apellido"] = user.apellido
        token["tipo"] = user.tipo
        return token


    def validate(self, attrs):
        attrs["username"] = attrs.get("email")  
        return super().validate(attrs)
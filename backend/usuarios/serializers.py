# usuarios/serializers.py
from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.password_validation import validate_password

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])

    class Meta:
        model = Usuario
        fields = [
            "id", "dni", "nombre", "apellido", "email", 
            "telefono", "sexo", "fecha_nacimiento", "is_active", "password"
        ]
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
            fecha_nacimiento=validated_data.get("fecha_nacimiento"),
            tipo="usuario"
        )
        if 'password' in validated_data:
            usuario.set_password(validated_data["password"])
        usuario.save()
        return usuario

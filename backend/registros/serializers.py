# backend/registros/serializers.py
from rest_framework import serializers
from .models import Registro

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = ['id', 'usuario', 'comision', 'fecha_inscripcion']

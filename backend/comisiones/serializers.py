# backend/comisiones/serializers.py
from rest_framework import serializers
from .models import Comision

class ComisionSerializer(serializers.ModelSerializer):
    actividad = serializers.StringRelatedField()
    profesor = serializers.StringRelatedField()

    class Meta:
        model = Comision
        fields = ['id', 'actividad', 'profesor', 'cupo', 'horario', 'duracion']
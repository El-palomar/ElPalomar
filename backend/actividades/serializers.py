#backend/actividades/serializers.py
from rest_framework import serializers
from .models import Actividades

class ActividadesSerializer (serializers.ModelSerializer):
    class Meta:
        model = Actividades
        fields = '__all__'
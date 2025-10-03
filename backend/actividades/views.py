#backend/actividades/views.py
from rest_framework import viewsets
from .models import Actividad
from .serializers import ActividadSerializer

# Create your views here.
class ActividadViewSet (viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
    
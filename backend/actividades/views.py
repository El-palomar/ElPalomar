from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Actividad
from .serializers import ActividadSerializer

class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
    permission_classes = [AllowAny]
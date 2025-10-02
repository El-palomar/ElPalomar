#backend/actividades/views.py
from rest_framework import viewsets
from .models import Actividades
from .serializers import ActividadesSerializer

# Create your views here.
class ActividadesViewset (viewsets.ModelViewSet):
    queryset = Actividades.objects.all()
    serializer_class = ActividadesSerializer
    
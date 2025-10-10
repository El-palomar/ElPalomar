#backend/comisiones/views.py
from rest_framework import viewsets
from .models import Comision
from .serializers import ComisionSerializer

# Create your views here.
class ComisionViewSet(viewsets.ModelViewSet):
    queryset = Comision.objects.all()
    serializer_class = ComisionSerializer
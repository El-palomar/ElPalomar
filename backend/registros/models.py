# backend/registros/models.py
from django.db import models
from usuarios.models import Usuario  
from comisiones.models import Comision

# Create your models here.

class Registro(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="registros")
    comision = models.ForeignKey(Comision, on_delete=models.CASCADE, related_name="registros")
    fecha_inscripcion = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario', 'comision') 

    def __str__(self):
        return f"{self.usuario.nombre} -> {self.comision.actividad.nombre}"

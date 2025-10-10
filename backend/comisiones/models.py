#backend/comisiones/models.py
from django.db import models
from profesores.models import Profesor
from actividades.models import Actividad


# Create your models here.
class Comision (models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE, related_name="comisiones")
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name="comisiones")
    cupo = models.IntegerField()
    horario = models.TimeField()
    duracion = models.DurationField()
    def __str__(self):
        return f"{self.actividad.nombre} - {self.profesor.nombre} {self.profesor.apellido}"


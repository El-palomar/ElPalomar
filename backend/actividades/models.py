#backend/actividades/models.py
from django.db import models

# Create your models here.
class Actividades(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)
    def __str__(self):
        return f"{self.nombre}, {self.descripcion}"
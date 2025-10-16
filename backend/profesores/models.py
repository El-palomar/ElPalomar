#backend/profesores/models.py
from django.db import models

# Create your models here.
class Profesor (models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=50,blank=True, null=True)
    def __str__(self):
        return f"{self.nombre},{self.apellido}"
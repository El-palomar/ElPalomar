# usuarios/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Usuario(AbstractUser):
    username = None  
    dni = models.CharField(max_length=15, unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    sexo = models.CharField(max_length=10, choices=[("M", "Masculino"), ("F", "Femenino")])
    edad = models.PositiveIntegerField(blank=True, null=True)
    tipo = models.CharField(
        max_length=20,
        choices=[("admin", "Admin"), ("usuario", "Usuario")],
        default="usuario"
    )

    USERNAME_FIELD = "correo"  # autenticación por correo
    REQUIRED_FIELDS = ["nombre", "apellido", "dni"]

    def __str__(self):
        return f"{self.correo} - {self.nombre} {self.apellido}"
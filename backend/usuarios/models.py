# usuarios/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    """Manager personalizado para Usuario sin username"""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('tipo', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class Usuario(AbstractUser):
    username = None  
    dni = models.CharField(max_length=15, unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    sexo = models.CharField(max_length=10, choices=[("M", "Masculino"), ("F", "Femenino")])
    edad = models.PositiveIntegerField(blank=True, null=True)
    tipo = models.CharField(
        max_length=20,
        choices=[("admin", "Admin"), ("usuario", "Usuario")],
        default="usuario"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nombre", "apellido", "dni"]

    objects = UsuarioManager()  

    def __str__(self):
        return f"{self.email} - {self.nombre} {self.apellido}"
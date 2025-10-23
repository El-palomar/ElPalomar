from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

# Register your models here.
@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    model = Usuario
    # Campos que se musetran en la lista de usuarios
    list_display = ("email", "nombre", "apellido", "tipo", "is_staff", "is_active")
    list_filter = ("tipo", "is_staff", "is_active")
    
    # Campos editables en el formulario de usuario
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Información personal", {"fields": ("nombre", "apellido", "dni", "telefono", "sexo", "fecha_nacimiento")}),
        ("Permisos", {"fields": ("tipo", "is_staff", "is_superuser", "is_active", "groups", "user_permissions")}),
    )
    
    # Campos para crear un usuario desde el admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "nombre", "apellido", "dni", "password1", "password2", "tipo", "is_staff", "is_active"),
        }),
    )
    
    #Campos para realizar busquedas rapidas
    search_fields = ("email", "nombre", "apellido", "dni")
    ordering = ("email",)

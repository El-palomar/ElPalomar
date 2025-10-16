import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService, IUsuario } from '@services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css'],
})
export class RegisterFormComponent {
  form;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      sexo: ['', Validators.required],
      fecha: ['', Validators.required],
      telefono: ['', [Validators.pattern('^[0-9]{7,15}$')]],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    // Validar contraseñas coincidan
    if (this.form.value.contrasena !== this.form.value.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden';
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas ingresadas deben ser iguales',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (this.form.valid) {
      // ✅ Calcular edad desde fecha de nacimiento
      const fechaNacimiento = new Date(this.form.value.fecha!);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }

      // ✅ Preparar objeto usuario para el backend (usando operador ! para asegurar que no son null)
      const nuevoUsuario: IUsuario = {
        email: this.form.value.email!,
        password: this.form.value.contrasena!,
        nombre: this.form.value.nombre!,
        apellido: this.form.value.apellido!,
        dni: this.form.value.dni!,
        sexo: this.form.value.sexo!,
        edad: edad,
        telefono: this.form.value.telefono || '',
      };

      console.log('📤 Enviando usuario:', nuevoUsuario);

      Swal.fire({
        title: 'Registrando usuario...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // ✅ Llamar al servicio de registro
      this.usuariosService.registro(nuevoUsuario).subscribe({
        next: (response) => {
          console.log('✅ Usuario registrado:', response);
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada correctamente',
            confirmButtonText: 'Ir al login',
            timer: 2000,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          console.error('❌ Error en registro:', error);

          // Mostrar errores específicos del backend
          if (error.error) {
            const errores = Object.entries(error.error)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ');
            this.errorMessage = errores;
          } else {
            this.errorMessage =
              'Error al registrar usuario. Intenta nuevamente.';
          }
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos correctamente',
        confirmButtonText: 'Aceptar'
      });
      this.errorMessage = 'Por favor completa todos los campos correctamente';
    }
  }
}

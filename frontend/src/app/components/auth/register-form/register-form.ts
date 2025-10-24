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
      const nuevoUsuario: IUsuario = {
        email: this.form.value.email!,
        password: this.form.value.contrasena!,
        nombre: this.form.value.nombre!,
        apellido: this.form.value.apellido!,
        dni: this.form.value.dni!,
        sexo: this.form.value.sexo!,
        fecha_nacimiento: this.form.value.fecha || undefined,
        telefono: this.form.value.telefono || '',
      };
      Swal.fire({
        title: 'Registrando usuario...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.usuariosService.registro(nuevoUsuario).subscribe({
        next: (response) => {
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
          Swal.close()
          if (error.error) {
            const errores = Object.entries(error.error)
              .map(([key, value]) => {
                if (typeof value === 'string' && value.includes('.,')) {
                  const mensajes = value.split('.,').map(msg => msg.trim()).join('\n• ');
                  return `${key}:\n• ${mensajes}`;
                }
                return `${key}: ${value}`;
              })
              .join('\n\n');
            this.errorMessage = errores;
          }
        }
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

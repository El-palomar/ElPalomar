import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService, IUsuario } from '@services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
})
export class LoginFormComponent {
  form;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      // Validar que email y password no sean null
      if (!email || !password) {
        this.errorMessage = 'Email y contraseña son requeridos';
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Email y contraseña son requeridos',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
      Swal.fire({
        title: 'Iniciando sesión...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.usuariosService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);

          const usuario: IUsuario = response.user;
          const tokens = {
            access: response.access,
            refresh: response.refresh,
          };

          localStorage.setItem('currentUser', JSON.stringify(usuario));
          this.usuariosService.setCurrentUser(usuario, tokens);
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `Hola ${usuario.nombre || usuario.email}`,
            confirmButtonText: 'Continuar',
            timer: 1500,
            timerProgressBar: true
          }).then(() => {
            if (usuario.tipo === 'admin') {
              this.router.navigate(['/admin_dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: (error) => {
          console.error('Error en login', error);
          let errorMsg = 'Email o contraseña incorrectos';
          if (error.status === 0) {
            errorMsg = 'No se pudo conectar con el servidor';
          } else if (error.status === 500) {
            errorMsg = 'Error en el servidor. Intenta más tarde';
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: errorMsg,
            confirmButtonText: 'Aceptar'
          });
        },
      });
    } else {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos correctamente',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}

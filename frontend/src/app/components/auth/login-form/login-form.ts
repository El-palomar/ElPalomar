import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService, IUsuario } from '@services/usuarios';

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
        return;
      }

      this.usuariosService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);

          const usuario: IUsuario = response.user;
          const tokens = {
            access: response.access,
            refresh: response.refresh,
          };

          this.usuariosService.setCurrentUser(usuario, tokens);

          if (usuario.tipo === 'admin') {
            this.router.navigate(['/admin_dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Error en login', error);
          this.errorMessage = 'Email o contraseña incorrectos';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

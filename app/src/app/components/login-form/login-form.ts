import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService, IUsuario } from '../../services/usuarios';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
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

      this.usuariosService.getAllUsuarios().subscribe((usuarios: IUsuario[]) => {
        // Buscamos el usuario que coincide con email y password
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
          console.log('Login correcto', usuario);

          // ===============================
          // GUARDAR EN LOCALSTORAGE
          // ===============================
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));

          // ===============================
          // REDIRIGIR SEGÚN ROL
          // ===============================
          if (usuario.role === 'admin') {
            this.router.navigate(['/admin_dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          // Mensaje de error si las credenciales son incorrectas
          this.errorMessage = 'Credenciales incorrectas';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}


import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  constructor(private router: Router) {}

  onSubmit(event: { usuario: string; contrasena: string }) {
    console.log('Usuario:', event.usuario);
    console.log('Contraseña:', event.contrasena);

    this.router.navigate(['/dashboard']);
  }
}

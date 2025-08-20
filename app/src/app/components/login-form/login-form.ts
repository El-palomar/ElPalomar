<<<<<<< HEAD
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule,RouterLink],
=======
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
>>>>>>> 7d6a929 (feat: se agrega pagina login con Angular)
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
})
export class LoginForm {
  usuario: string = '';
  contrasena: string = '';

  @Output() submitForm = new EventEmitter<{
    usuario: string;
    contrasena: string;
  }>();

  onSubmit() {
    this.submitForm.emit({
      usuario: this.usuario,
      contrasena: this.contrasena,
    });
  }
}

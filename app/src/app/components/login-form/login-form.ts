import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
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

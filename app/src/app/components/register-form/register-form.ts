import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterForm {
  email: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  nombre: string = '';
  apellido: string = '';
  fecha: string = '';
  telefono: string = '';

  constructor(private router: Router) {}
   onSubmit(form: any) {
    if (form.valid && this.contrasena === this.confirmarContrasena) {
      console.log('✅ Formulario válido:', form.value);
      alert('Registro exitoso ✅');
      this.router.navigate(['/login']);
    } else {
      console.log('❌ Formulario inválido o contraseñas distintas');
      alert('Revisa los datos ingresados ❌');
    }
  }


}

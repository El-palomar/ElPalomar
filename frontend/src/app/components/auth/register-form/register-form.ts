
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterFormComponent {
  form;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    confirmarContrasena: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fecha: ['', Validators.required],
    telefono: ['', [Validators.pattern('^[0-9]{7,15}$')]]
    });
  }

   isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  
   onSubmit()  {
    if (this.form.valid && this.form.value.contrasena === this.form.value.confirmarContrasena) {
      console.log('✅ Formulario válido:', this.form.value);
      alert('Registro exitoso ✅');
      this.router.navigate(['/login']);
    } else {
      console.log(' Formulario inválido o contraseñas distintas');
      alert('Revisa los datos ingresados ');
    }
  }


}

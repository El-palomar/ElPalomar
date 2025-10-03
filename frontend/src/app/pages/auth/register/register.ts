import { Component } from '@angular/core';
import { RegisterForm } from '@components/auth/register-form/register-form';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterForm, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}

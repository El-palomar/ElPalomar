import { Component } from '@angular/core';
import { RegisterFormComponent } from '@components/auth/register-form/register-form';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}

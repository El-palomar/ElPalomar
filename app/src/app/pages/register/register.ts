import { Component } from '@angular/core';
import { RegisterForm } from '../../components/register-form/register-form';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterForm,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}

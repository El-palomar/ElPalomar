import { Component } from '@angular/core';
import { RegisterForm } from '../../components/register-form/register-form';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}

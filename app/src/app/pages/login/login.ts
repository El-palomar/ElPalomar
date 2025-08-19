import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-login',
  imports: [Header, Footer, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}

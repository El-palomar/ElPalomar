import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginPage },
  { path: 'register', component: Register },
];

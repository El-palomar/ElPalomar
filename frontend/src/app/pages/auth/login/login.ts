import { Component } from '@angular/core';

import { LoginFormComponent } from '@components/auth/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.html',
})
export class LoginPage { }

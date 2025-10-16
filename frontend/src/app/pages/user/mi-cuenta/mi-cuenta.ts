import { Component } from '@angular/core';
import { Footer } from '@components/layout/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  imports: [Footer, RouterModule],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css'
})
export class MiCuenta {

}

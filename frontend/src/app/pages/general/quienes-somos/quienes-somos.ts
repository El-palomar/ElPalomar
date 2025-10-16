import { Component } from '@angular/core';
import { QuienesSomosComponent } from '@components/features/quienes-somos-component/quienes-somos-component';
import { Footer } from '@components/layout/footer/footer';
import { Header } from '@components/layout/header/header';

@Component({
  selector: 'app-quienes-somos',
  imports: [Header, Footer, QuienesSomosComponent],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuienesSomos { }

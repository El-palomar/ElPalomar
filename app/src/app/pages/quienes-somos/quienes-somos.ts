import { Component } from '@angular/core';
import { QuienesSomosC } from '../../components/quienes-somos/quienes-somos';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-quienes-somos',
  imports: [Header, Footer, QuienesSomosC],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuienesSomos {}

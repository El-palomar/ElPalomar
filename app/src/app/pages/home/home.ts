import { Component } from '@angular/core';
import { ActividadesHome } from '../../components/actividades-home/actividades-home';
import { Beneficios } from '../../components/beneficios/beneficios';
import { Main } from '../../components/main/main';
<<<<<<< HEAD
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, ActividadesHome,Beneficios,Main],
=======

@Component({
  selector: 'app-home',
  imports: [ActividadesHome,Beneficios,Main],
>>>>>>> 92ac105 (Crea base del proyecto de Angular y termina vista Home)
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}

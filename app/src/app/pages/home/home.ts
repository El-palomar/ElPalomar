import { Component } from '@angular/core';
import { ActividadesHome } from '../../components/actividades-home/actividades-home';
import { Beneficios } from '../../components/beneficios/beneficios';
import { Main } from '../../components/main/main';

@Component({
  selector: 'app-home',
  imports: [ActividadesHome,Beneficios,Main],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}

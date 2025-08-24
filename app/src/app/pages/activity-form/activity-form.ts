import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Footer } from '../../components/footer/footer';
import { FormularioActividadesComponent } from '../../components/formulario-actividades/formulario-actividades';


@Component({
  selector: 'app-activity-form',
  imports: [Sidebar,Footer,FormularioActividadesComponent], 
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.css'
})
export class ActivityForm {

}

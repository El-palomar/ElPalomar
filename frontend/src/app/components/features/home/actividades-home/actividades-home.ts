
import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from '@models/activity';

@Component({
  selector: 'app-actividades-home',
  imports: [],
  templateUrl: './actividades-home.html',
  styleUrl: './actividades-home.css'
})
export class ActividadesHome {
  @Input() activities: IActivity[] = []

}

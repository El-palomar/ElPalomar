import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IActividad } from '@services/activities';

@Component({
  selector: 'app-actividades-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actividades-home.html',
  styleUrls: ['./actividades-home.css'],
})
export class ActividadesHome {
  @Input() activities: IActividad[] = [];
}

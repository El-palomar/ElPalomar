import { Component, OnInit } from '@angular/core';
import { ActividadesHome } from '@components/features/home/actividades-home/actividades-home';
import { Beneficios } from '@components/features/home/beneficios/beneficios';
import { Main } from '@components/features/home/main/main';
import { Footer } from '@components/layout/footer/footer';
import { Header } from '@components/layout/header/header';
import { ActividadesService, IActividad } from '@services/activities';
import { IActivity } from '@models/activity';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, ActividadesHome, Beneficios, Main],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  activities: IActividad[] = [];

  constructor(private activitiesService: ActividadesService) {}

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.activitiesService.getAllActividades().subscribe({
      next: (activities: IActividad[]) => {
        this.activities = activities;
      },
      error: (error: any) => {
        console.error('Error', error);
      },
    });
  }
}

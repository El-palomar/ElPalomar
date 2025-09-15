import { Component, OnInit } from '@angular/core';
import { ActividadesHome } from '../../components/actividades-home/actividades-home';
import { Beneficios } from '../../components/beneficios/beneficios';
import { Main } from '../../components/main/main';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ActivitiesService } from '../../services/activities';
import { IActivity } from '../../models/activity';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, ActividadesHome, Beneficios, Main],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  activities: IActivity[] = []

  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.activitiesService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities
      },
      error: (error) => {
        console.error("Error", error)
      }
    })
  };

}

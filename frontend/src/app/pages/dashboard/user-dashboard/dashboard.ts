import { Component, OnInit } from '@angular/core';
import { Footer } from '@components/layout/footer/footer';
import { RouterModule } from '@angular/router';
import { Sidebar } from '@components/layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { ActividadesService, IActividad } from '@services/activities';
import { UserService } from '@services/user';
import { IActivity } from '@models/activity';
import { IUserActivity } from '@models/user-activity';
import { DashboardWelcome } from '@components/features/dashboard-welcome/dashboard-welcome';
import { CardsProfesores } from "@components/features/cards-profesores/cards-profesores";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, Footer, RouterModule, DashboardWelcome, CardsProfesores, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  activities: IActividad[] = [];
  userActivities: IUserActivity[] = [];
  isLoading: boolean = true;

  constructor(
    private activityService: ActividadesService,
  ) { }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.isLoading = true;

    forkJoin({
      activities: this.activityService.getAllActividades(),
    }).subscribe({
      next: (results) => {
        console.log(results)
        this.activities = results.activities;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.isLoading = false;
      }
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'public/images/default.jpg';
  }
}
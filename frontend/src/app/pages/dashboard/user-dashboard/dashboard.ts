import { Component, OnInit } from '@angular/core';
import { Footer } from '@components/layout/footer/footer';
import { RouterModule } from '@angular/router';
import { Sidebar } from '@components/layout/sidebar/sidebar';
import { ActividadesService, IActividad } from '@services/activities';

import { UserService } from '@services/user';
import { IActivity } from '@models/activity';
import { IUserActivity } from '@models/user-activity';
import { DashboardWelcome } from '@components/features/dashboard-welcome/dashboard-welcome';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, Footer, RouterModule, DashboardWelcome],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  activities: IActividad[] = [];
  userActivities: IUserActivity[] = [];
  constructor(
    private activityService: ActividadesService,
    private userActivityService: UserService
  ) {}

  ngOnInit() {
    this.getInitialData();
  }
  getInitialData() {
    this.activityService.getAllActividades().subscribe({
      next: (activities: IActividad[]) => {
        this.activities = activities;
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
    this.userActivityService.getAllUserActivities().subscribe({
      next: (activities) => {
        this.userActivities = activities;
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }
}

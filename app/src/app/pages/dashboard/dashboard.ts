import { Component, OnInit } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ActivitiesService } from '../../services/activities';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { IActivity } from '../../models/activity';
import { IUserActivity } from '../../models/user-activity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, Footer, RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  activities: IActivity[] = [];
  userActivities: IUserActivity[] = [];
  isAdmin: boolean = false; // nueva variable
  currentUser: any; // usuario logueado

  constructor(
    private activityService: ActivitiesService,
    private userActivityService: UserService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.getInitialData();
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isAdmin = this.currentUser.role === 'admin';
    }
  }

  getInitialData() {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
      },
      error: (error) => {
        console.error('Error', error);
      }
    });

    // Solo traemos actividades del usuario si NO es admin
    if (!this.isAdmin) {
      this.userActivityService.getAllUserActivities().subscribe({
        next: (activities) => {
          this.userActivities = activities;
        },
        error: (error) => {
          console.error('Error', error);
        }
      });
    }
  }
}
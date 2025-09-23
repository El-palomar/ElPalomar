import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../services/activities';
import { IActivity } from '../../models/activity';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [Sidebar, Footer, RouterModule, CommonModule]
})
export class AdminDashboard implements OnInit {
  activities: IActivity[] = [];

  constructor(private activityService: ActivitiesService) { }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => this.activities = activities,
      error: (error) => console.error('Error cargando actividades', error)
    });
  }

  deleteActivity(id: number): void {
    this.activities = this.activities.filter(a => a.id !== id);
    console.log('Actividad eliminada:', id);
  }
}
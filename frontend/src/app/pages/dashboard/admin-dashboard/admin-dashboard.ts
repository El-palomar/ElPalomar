import { Component, OnInit } from '@angular/core';
import { Sidebar } from '@components/layout/sidebar/sidebar';
import { Footer } from '@components/layout/footer/footer';
import { RouterModule } from '@angular/router';

import { ActivitiesService } from '@services/activities';
import { IActivity } from '@models/activity';

interface IUser {
  id: number;
  name: string;
  email: string;
  membership: string;
  isActive: boolean;
}

interface ITeam {
  id: number;
  name: string;
  activity: string;
  members: IUser[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [Sidebar, Footer, RouterModule]
})
export class AdminDashboard implements OnInit {
  activities: IActivity[] = [];
  users: IUser[] = [];
  teams: ITeam[] = [];

  constructor(private activityService: ActivitiesService) { }

  ngOnInit(): void {
    this.loadActivities();
    this.loadUsers();
    this.loadTeams();
  }

  // ===== Actividades =====
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

  toggleStatus(activity: IActivity): void {
    activity.isActive = !activity.isActive;
    console.log(`Actividad ${activity.id} ahora está ${activity.isActive ? 'Activa' : 'Inactiva'}`);
  }

  // ===== Socios =====
  loadUsers(): void {
    // Datos simulados
    this.users = [
      { id: 1, name: 'Carlos Pérez', email: 'carlos@mail.com', membership: 'Premium', isActive: true },
      { id: 2, name: 'María Aquino', email: 'maria@mail.com', membership: 'Básica', isActive: false }
    ];
  }

  toggleUserStatus(user: IUser): void {
    user.isActive = !user.isActive;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  // ===== Equipos =====
  loadTeams(): void {
    // Datos simulados
    this.teams = [
      { id: 1, name: 'Equipo A', activity: 'Fútbol', members: [this.users[0]] },
      { id: 2, name: 'Equipo B', activity: 'Natación', members: [this.users[1]] }
    ];
  }

  deleteTeam(id: number): void {
    this.teams = this.teams.filter(t => t.id !== id);
  }
}

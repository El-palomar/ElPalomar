import { Component, OnInit } from '@angular/core';
import { Sidebar } from '@components/layout/sidebar/sidebar';
import { Footer } from '@components/layout/footer/footer';
import { RouterModule } from '@angular/router';

import { ActivitiesService } from '@services/activities';
import { UsuariosService, IUsuario } from '@services/usuarios';
import { TeamsService, ITeam } from '@services/teams';
import { IActivity } from '@models/activity';
import { DashboardWelcome } from '@components/features/dashboard-welcome/dashboard-welcome';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [Sidebar, Footer, RouterModule, DashboardWelcome],
})
export class AdminDashboard implements OnInit {
  activities: IActivity[] = [];
  users: IUsuario[] = [];
  teams: ITeam[] = [];

  constructor(
    private activityService: ActivitiesService,
    private usuariosService: UsuariosService,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    this.loadUsers();
    this.loadTeams();
  }

  // ===== Actividades =====
  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
        console.log('Actividades cargadas:', activities);
      },
      error: (err) => console.error('Error cargando actividades', err),
    });
  }

  deleteActivity(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.activityService.deleteActivity(id).subscribe({
        next: () => {
          this.activities = this.activities.filter((a) => a.id !== id);
          console.log('Actividad eliminada');
        },
        error: (err) => console.error('Error eliminando actividad', err),
      });
    }
  }

  toggleStatus(activity: IActivity): void {
    const newStatus = !activity.isActive;
    this.activityService
      .updateActivity(activity.id!, { isActive: newStatus })
      .subscribe({
        next: () => {
          activity.isActive = newStatus;
          console.log('Estado actualizado');
        },
        error: (err) => console.error('Error actualizando actividad', err),
      });
  }

  // ===== Socios =====
  loadUsers(): void {
    this.usuariosService.getAllUsuarios().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Usuarios cargados:', users);
      },
      error: (err) => console.error('Error cargando usuarios', err),
    });
  }

  toggleUserStatus(user: IUsuario): void {
    const newStatus = !user.is_active;
    this.usuariosService.toggleUsuarioStatus(user.id!, newStatus).subscribe({
      next: () => {
        user.is_active = newStatus;
        console.log('Estado de usuario actualizado');
      },
      error: (err) => console.error('Error actualizando usuario', err),
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== id);
          console.log('Usuario eliminado');
        },
        error: (err) => console.error('Error eliminando usuario', err),
      });
    }
  }

  // ===== Equipos =====
  loadTeams(): void {
    this.teamsService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams;
        console.log('Equipos cargados:', teams);
      },
      error: (err) => {
        console.error('Error cargando equipos', err);
        // Datos de ejemplo si no existe el endpoint
        this.teams = [];
      },
    });
  }

  deleteTeam(id: number): void {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
      this.teamsService.deleteTeam(id).subscribe({
        next: () => {
          this.teams = this.teams.filter((t) => t.id !== id);
          console.log('Equipo eliminado');
        },
        error: (err) => console.error('Error eliminando equipo', err),
      });
    }
  }
}

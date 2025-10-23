import { Component, OnInit } from '@angular/core';
import { Sidebar } from '@components/layout/sidebar/sidebar';
import { Footer } from '@components/layout/footer/footer';
import { RouterModule } from '@angular/router';

import { ActividadesService, IActividad } from '@services/activities';
import { UsuariosService, IUsuario } from '@services/usuarios';
import { TeamsService, ITeam } from '@services/teams';
import { DashboardWelcome } from '@components/features/dashboard-welcome/dashboard-welcome';
import Swal from 'sweetalert2';
import { ListaProfesoresComponent } from '@components/features/lista-profesores/lista-profesores';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [Sidebar, Footer, RouterModule, DashboardWelcome, ListaProfesoresComponent],
})
export class AdminDashboard implements OnInit {
  activities: IActividad[] = [];
  users: IUsuario[] = [];
  teams: ITeam[] = [];

  constructor(
    private activityService: ActividadesService,
    private usuariosService: UsuariosService,
    private teamsService: TeamsService
  ) { }

  ngOnInit(): void {
    this.loadActivities();
    this.loadUsers();
    this.loadTeams();
  }

  // ===== Actividades =====
  loadActivities(): void {
    this.activityService.getAllActividades().subscribe({
      next: (activities: IActividad[]) => {
        this.activities = activities;
      },
      error: (err: any) => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las actividades',
        confirmButtonText: 'Aceptar'
      })
    });
  }

  deleteActivity(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar esta actividad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.activityService.deleteActividad(id).subscribe({
          next: () => {
            this.activities = this.activities.filter((a) => a.id !== id);
            Swal.fire({
              icon: 'success',
              title: '¡Eliminada!',
              text: 'Actividad eliminada correctamente',
              confirmButtonText: 'Aceptar',
              timer: 2000,
              timerProgressBar: true
            });
          },
          error: (err: any) => {
            console.error('Error eliminando actividad', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la actividad',
              confirmButtonText: 'Aceptar'
            });
          },
        });
      }
    });
  }

  // ✅ ELIMINADA toggleStatus porque tu modelo no tiene campo 'activo'

  // ===== Socios =====
  loadUsers(): void {
    this.usuariosService.getAllUsuarios().subscribe({
      next: (users: IUsuario[]) => {
        this.users = users;
      },
      error: (err: any) => {
        console.error('Error cargando usuarios', err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los usuarios',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  toggleUserStatus(user: IUsuario): void {
    const newStatus = !user.is_active;
    const accion = newStatus ? 'activar' : 'desactivar';

    Swal.fire({
      title: '¿Confirmar cambio?',
      text: `¿Deseas ${accion} este usuario?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.toggleUsuarioStatus(user.id!, newStatus).subscribe({
          next: () => {
            user.is_active = newStatus;
            Swal.fire({
              icon: 'success',
              title: '¡Actualizado!',
              text: `Usuario ${accion === 'activar' ? 'activado' : 'desactivado'} correctamente`,
              confirmButtonText: 'Aceptar',
              timer: 2000,
              timerProgressBar: true
            });
          },
          error: (err: any) => {
            console.error('Error actualizando usuario', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el estado del usuario',
              confirmButtonText: 'Aceptar'
            });
          },
        });
      }
    });
  }


  deleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.deleteUsuario(id).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.id !== id);
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Usuario eliminado correctamente',
              confirmButtonText: 'Aceptar',
              timer: 2000,
              timerProgressBar: true
            });
          },
          error: (err: any) => {
            console.error('Error eliminando usuario', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el usuario',
              confirmButtonText: 'Aceptar'
            });
          },
        });
      }
    });
  }

  // ===== Equipos =====
  loadTeams(): void {
    this.teamsService.getAllTeams().subscribe({
      next: (teams: ITeam[]) => {
        this.teams = teams;
      },
      error: (err: any) => {
        console.error('Error cargando equipos', err);
        this.teams = [];
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los equipos',
          confirmButtonText: 'Aceptar'
        });
      },
    });
  }

  deleteTeam(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este equipo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamsService.deleteTeam(id).subscribe({
          next: () => {
            this.teams = this.teams.filter((t) => t.id !== id);
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Equipo eliminado correctamente',
              confirmButtonText: 'Aceptar',
              timer: 2000,
              timerProgressBar: true
            });
          },
          error: (err: any) => {
            console.error('Error eliminando equipo', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el equipo',
              confirmButtonText: 'Aceptar'
            });
          },
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DashboardUserCard } from '@components/features/dashboard-user-card/dashboard-user-card';
import { IUsuario } from '@services/usuarios';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, DashboardUserCard],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  tipo: 'admin' | 'usuario' | undefined = undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const usuarioActual = localStorage.getItem('currentUser');
    if (usuarioActual) {
      const usuario: IUsuario = JSON.parse(usuarioActual);
      this.tipo = usuario.tipo;
    }
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}

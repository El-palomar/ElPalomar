import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DashboardUserCard } from '@components/features/dashboard-user-card/dashboard-user-card';

import { IUsuario } from '@services/usuarios';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, DashboardUserCard],  // Agregar CommonModule
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit {
  role: 'admin' | 'cliente' | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
      const usuario: IUsuario = JSON.parse(usuarioActual);
      this.role = usuario.role;
      console.log('Sidebar cargado con role:', this.role);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { IUsuario } from '@services/usuarios';

@Component({
  selector: 'app-dashboard-user-card',
  imports: [],
  templateUrl: './dashboard-user-card.html',
  styleUrl: './dashboard-user-card.css'
})
export class DashboardUserCard {
  user: IUsuario | null = null;
  ngOnInit() {
    this.getCurrentUser()
  }
  getCurrentUser(): void {
    const userString = localStorage.getItem("currentUser")
    if (userString) {
      try {
        this.user = JSON.parse(userString)
      } catch (error) {
        console.error("Error al parsear el usuario:", error)
        this.user = null
      }
    }
  }
}

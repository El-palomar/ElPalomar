import { Component } from '@angular/core';
import { IUsuario } from '@models/usuarios';

@Component({
  selector: 'app-dashboard-welcome',
  imports: [],
  templateUrl: './dashboard-welcome.html',
  styleUrl: './dashboard-welcome.css'
})
export class DashboardWelcome {
  currentDate: string = ''
  user: IUsuario | null = null;

  ngOnInit() {
    this.currentDate = this.getCurrentFormattedDate()
    this.getCurrentUser()
  }
  getCurrentFormattedDate(): string {
    const date = new Date()
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const diaSemana = dias[date.getDay()]
    const dia = date.getDate()
    const mes = meses[date.getMonth()]

    return `${diaSemana}, ${dia} de ${mes}`
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
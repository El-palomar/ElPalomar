import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUsuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  role: 'admin' | 'cliente';
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dataURL = '/assets/data/usuarios.json';
  private currentUser: IUsuario | null = null;

  constructor(private http: HttpClient) {}

  // Trae todos los usuarios desde el JSON
  getAllUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.dataURL);
  }

  // Setea el usuario que se logueó
  setCurrentUser(user: IUsuario) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user)); // Persistencia opcional
  }

  // Devuelve el usuario logueado
  getCurrentUser(): IUsuario | null {
    if (!this.currentUser) {
      const saved = localStorage.getItem('currentUser');
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
    return this.currentUser;
  }

  // Cierra sesión
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}

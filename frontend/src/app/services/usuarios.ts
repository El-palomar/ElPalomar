import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUsuario {
  id?: number;
  nombre: string;
  apellido?: string;
  email: string;
  password?: string;
  tipo?: 'admin' | 'usuario';
  dni?: string;
  telefono?: string;
  sexo?: string;
  edad?: number;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiURL = 'http://127.0.0.1:8000/api/usuarios/usuarios/';
  private loginURL = 'http://127.0.0.1:8000/api/usuarios/login/';
  private currentUser: IUsuario | null = null;

  constructor(private http: HttpClient) {}

  /** LOGIN: devuelve access y refresh tokens */
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginURL, { email, password });
  }

  /** Guardar tokens y usuario logueado */
  setCurrentUser(user: IUsuario, tokens: { access: string; refresh: string }) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
  }

  /** Obtener usuario logueado */
  getCurrentUser(): IUsuario | null {
    if (!this.currentUser) {
      const saved = localStorage.getItem('currentUser');
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
    return this.currentUser;
  }

  /** Logout */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /** Header con token JWT */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Obtener todos los usuarios */
  getAllUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiURL, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Crear usuario */
  createUsuario(user: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiURL, user, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Editar usuario */
  updateUsuario(id: number, user: Partial<IUsuario>): Observable<IUsuario> {
    return this.http.patch<IUsuario>(`${this.apiURL}${id}/`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Eliminar usuario */
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Activar/Desactivar usuario */
  toggleUsuarioStatus(id: number, isActive: boolean): Observable<IUsuario> {
    return this.http.patch<IUsuario>(
      `${this.apiURL}${id}/`,
      { is_active: isActive },
      { headers: this.getAuthHeaders() }
    );
  }
}

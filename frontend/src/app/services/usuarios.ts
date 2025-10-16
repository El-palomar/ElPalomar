import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private registroURL = 'http://127.0.0.1:8000/api/usuarios/registro/';

  constructor(private http: HttpClient) {}

  // ✅ Métodos de autenticación (aunque no los uses, para que no den error)
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginURL, { email, password });
  }

  registro(user: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.registroURL, user);
  }

  setCurrentUser(user: IUsuario, tokens: any) {
    // Método vacío para compatibilidad
  }

  // ✅ CRUD sin autenticación
  getAllUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiURL);
  }

  createUsuario(user: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiURL, user);
  }

  updateUsuario(id: number, user: Partial<IUsuario>): Observable<IUsuario> {
    return this.http.patch<IUsuario>(`${this.apiURL}${id}/`, user);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`);
  }

  toggleUsuarioStatus(id: number, isActive: boolean): Observable<IUsuario> {
    return this.http.patch<IUsuario>(`${this.apiURL}${id}/`, {
      is_active: isActive,
    });
  }
}

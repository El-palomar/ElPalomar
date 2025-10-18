import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IProfesor{
  id?: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private apiURL= 'http://127.0.0.1:8000/api/profesores/profesores/';
  constructor(private http: HttpClient) {}

  /* Metodos GET, para obtener todos los profesores (en este caso) o un profesor en particular */
  getAllProfesores(): Observable<IProfesor[]>{
    return this.http.get<IProfesor[]>(this.apiURL)
  }

  getProfesor(id: number): Observable<IProfesor>{
    return this.http.get<IProfesor>(`${this.apiURL}${id}/`);
  }
  /* Metodos post, update, delete: permiten publicar, actualizar, eliminar profesores*/ 
  createProfesor(profesor: IProfesor): Observable<IProfesor> {
    return this.http.post<IProfesor>(this.apiURL, profesor);
  }
  
  updateProfesor(
    id: number,
    profesor: Partial<IProfesor>
  ): Observable<IProfesor> {
    return this.http.patch<IProfesor>(`${this.apiURL}${id}/`, profesor);
  }
  
  deleteProfesor(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`);
  }
}

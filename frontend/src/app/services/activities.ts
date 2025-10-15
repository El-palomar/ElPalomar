import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IActividad {
  id?: number;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  private apiURL = 'http://127.0.0.1:8000/api/actividades/actividades/';

  constructor(private http: HttpClient) {}

  getAllActividades(): Observable<IActividad[]> {
    return this.http.get<IActividad[]>(this.apiURL);
  }

  createActividad(actividad: IActividad): Observable<IActividad> {
    return this.http.post<IActividad>(this.apiURL, actividad);
  }

  updateActividad(
    id: number,
    actividad: Partial<IActividad>
  ): Observable<IActividad> {
    return this.http.patch<IActividad>(`${this.apiURL}${id}/`, actividad);
  }

  deleteActividad(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`);
  }
}

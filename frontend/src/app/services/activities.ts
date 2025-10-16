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
export class ActivitiesService {
  // ✅ URL del backend Django (ajustá si usan otra)
  private apiURL = 'http://127.0.0.1:8000/api/actividades/';

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades
  getAllActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.apiURL);
  }

  // Obtener una actividad específica por ID
  getActivity(id: number): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.apiURL}${id}/`);
  }

  // Crear nueva actividad
  createActivity(activity: IActivity): Observable<IActivity> {
    return this.http.post<IActivity>(this.apiURL, activity);
  }

  // Editar actividad completa
  updateActivity(id: number, activity: IActivity): Observable<IActivity> {
    return this.http.put<IActivity>(`${this.apiURL}${id}/`, activity);
  }

  // Editar solo algunos campos
  patchActivity(id: number, data: Partial<IActivity>): Observable<IActivity> {
    return this.http.patch<IActivity>(`${this.apiURL}${id}/`, data);
  }

  // Eliminar actividad
  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`);
  }
}

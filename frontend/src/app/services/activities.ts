import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  private apiURL = 'http://127.0.0.1:8000/api/actividades/actividades/';

  constructor(private http: HttpClient) {}

  /** Header con token JWT */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Obtener todas las actividades */
  getAllActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.apiURL, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Obtener una actividad por ID */
  getActivityById(id: number): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.apiURL}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Crear actividad */
  createActivity(activity: IActivity): Observable<IActivity> {
    return this.http.post<IActivity>(this.apiURL, activity, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Actualizar actividad */
  updateActivity(
    id: number,
    activity: Partial<IActivity>
  ): Observable<IActivity> {
    return this.http.patch<IActivity>(`${this.apiURL}${id}/`, activity, {
      headers: this.getAuthHeaders(),
    });
  }

  /** Eliminar actividad */
  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }
}

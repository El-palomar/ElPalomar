import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITeam {
  id?: number;
  name: string;
  activity: string;
  members: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiURL = 'http://127.0.0.1:8000/api/comisiones/'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(this.apiURL, {
      headers: this.getAuthHeaders(),
    });
  }

  getTeamById(id: number): Observable<ITeam> {
    return this.http.get<ITeam>(`${this.apiURL}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  createTeam(team: ITeam): Observable<ITeam> {
    return this.http.post<ITeam>(this.apiURL, team, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTeam(id: number, team: Partial<ITeam>): Observable<ITeam> {
    return this.http.patch<ITeam>(`${this.apiURL}${id}/`, team, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private dataURL = "/assets/data/activities.json" // Es la url donde se hace la peticion

  constructor(private http: HttpClient) { }

  getAllActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.dataURL)
  }
}

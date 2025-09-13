import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private dataURL = "/assets/data/activities.json" // Es la url donde se hace la peticion
  private crudURL = "/assets/data/activitiesCrud.json"

  constructor(private http: HttpClient) { }

  getAllActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.dataURL)
  }
  getCrudData(): Observable<any> {
    return this.http.get<any>(this.crudURL);
  }
}

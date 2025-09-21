import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserActivity } from '../models/user-activity';

@Injectable({
  providedIn: 'root'
})
export class UserActivitiesService {
  private dataURL = '/assets/data/activitiesusers.json';

  constructor(private http: HttpClient) {}

  getAllUserActivities(): Observable<IUserActivity[]> {
    return this.http.get<IUserActivity[]>(this.dataURL);
  }
}
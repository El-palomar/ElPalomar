import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserActivity } from '../models/user-activity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataURL = "/assets/data/activitiesUser.json"

  constructor(private http: HttpClient) { }

  getAllUserActivities(): Observable<IUserActivity[]> {
    return this.http.get<IUserActivity[]>(this.dataURL)
  }
}

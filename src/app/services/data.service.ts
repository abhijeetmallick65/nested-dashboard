import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://localhost:3001/metrics'; 
  constructor(private http: HttpClient) { }
  getMetrics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
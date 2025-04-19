// src/app/services/data.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private renderUrl = 'https://dashboard-api-88av.onrender.com/flat';
  private localUrl = 'http://localhost:3001/metrics';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<any> {
    return this.http.get<any>(this.renderUrl).pipe(
      catchError(err => {
        console.warn('Render API failed, falling back to localhost:', err);
        return this.http.get<any>(this.localUrl);
      })
    );
  }
}

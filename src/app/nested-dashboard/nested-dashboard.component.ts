// src/app/nested-dashboard/nested-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/section.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-nested-dashboard',
  templateUrl: './nested-dashboard.component.html',
  styleUrls: ['./nested-dashboard.component.css']
})
export class NestedDashboardComponent implements OnInit {
  sections: Section[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Section[]>('https://dashboard-api-88av.onrender.com/sections')
      .pipe(
        catchError(err => {
          console.warn('Render API failed, falling back to localhost:', err);
          return this.http.get<Section[]>('http://localhost:3002/sections');
        })
      )
      .subscribe(data => {
        console.log('Sections data:', data);
        this.sections = data;
      });
  }
}

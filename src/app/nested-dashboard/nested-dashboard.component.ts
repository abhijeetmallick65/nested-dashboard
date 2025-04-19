// src/app/nested-dashboard/nested-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/section.model';

@Component({
  selector: 'app-nested-dashboard',
  templateUrl: './nested-dashboard.component.html',
  styleUrls: ['./nested-dashboard.component.css']
})
export class NestedDashboardComponent implements OnInit {
  sections: Section[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Section[]>('http://localhost:3002/sections')
      .subscribe(data => {
        console.log('Sections data:', data);
        this.sections = data
        console.log('Sections:', this.sections);
      });
  }
}

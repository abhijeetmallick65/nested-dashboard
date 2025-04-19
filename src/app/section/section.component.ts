import { Component, Input,OnInit } from '@angular/core';
import { Section } from '../models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input() section!: Section;

  currentLayout: 'original' | 'horizontal' | 'vertical' = 'original';
ngOnInit(): void {
    
}
  getFlexDirection(): string {
    if (this.currentLayout === 'horizontal') return 'row';
    if (this.currentLayout === 'vertical') return 'column';
    return this.section.layout === 'horizontal' ? 'row' : 'column';
  }

  setLayout(layout: 'original' | 'horizontal' | 'vertical') {
    this.currentLayout = layout;
  }
}

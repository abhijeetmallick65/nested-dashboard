import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-view-modal',
  templateUrl: './chart-view-modal.component.html',
  styleUrls: ['./chart-view-modal.component.css']
})
export class ChartViewModalComponent {
  @Input() metric: any;
  @Output() close = new EventEmitter<void>();

  chartTypes: string[] = ['line', 'Bar', 'Pie', 'Area', 'Radar', 'Gauge', 'Treemap', 'Scatter', 'Heatmap', 'Sankey'];
  selectedTypes: string[] = [];

  toggleChart(type: string) {
    const index = this.selectedTypes.indexOf(type);
    if (index >= 0) this.selectedTypes.splice(index, 1);
    else this.selectedTypes.push(type);
    console.log(this.selectedTypes);
  }

  isSelected(type: string): boolean {
    return this.selectedTypes.includes(type);
  }

  closeModal() {
    this.close.emit(); 
  }
}

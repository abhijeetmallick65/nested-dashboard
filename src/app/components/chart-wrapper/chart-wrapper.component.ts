import { Component, Input ,OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.css']
})
export class ChartWrapperComponent implements OnInit {
  @Input() chartType!: string;     // 'line', 'bar', 'pie', etc.
  @Input() metricName!: string;
  @Input() values: any[] = [];
  @Input() metric:any;
  showModal: boolean = false;
  ngOnInit() {
    console.log('Metric received:', this.metric);
   
      this.metricName = this.metric.name || this.metric.metricName || 'Unknown';
      this.chartType = this.metric.chartType?.toLowerCase() || 'unsupported';
      this.values = this.metric.data || this.metric.values ||[];
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

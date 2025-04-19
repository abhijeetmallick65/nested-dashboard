import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const rangeToSeconds: Record<string, number> = {
  '5m': 5 * 60,                
  '30m': 30 * 60,              
  '1h': 60 * 60,              
  '1d': 24 * 60 * 60,         
  '7d': 7 * 24 * 60 * 60,      
  '30d': 30 * 24 * 60 * 60,    
  '1y': 365 * 24 * 60 * 60,   
  'all': Infinity
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('pdfContainer') pdfContainer!: ElementRef;

  metrics: any[] = [];
  originalMetrics: any[] = [];
  searchTerm: string = '';
  selectedRange: string = '30d';
  chartOverrides: Record<string, string> = {};
  chartTypes: string[] = [];
  compareList: string[] = []; 
  showCompareModal: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMetrics().subscribe(data => {
      console.log('Metrics data:', data);
      this.chartTypes = Array.from(new Set(data.map((m: any) => m.chart_type)));
      this.originalMetrics = data.filter((m: any) => m.chart_type && m.metric?.__name__);
      this.filterMetricValuesByRange(this.selectedRange);
    });
  }

  onRangeSelect(rangeKey: string) {
    this.selectedRange = rangeKey;
    this.filterMetricValuesByRange(rangeKey);
  }

  filterMetricValuesByRange(rangeKey: string) {
    const now = Date.now();
    const cutoff = rangeToSeconds[rangeKey] * 1000; 
  
    console.log('Selected Range:', rangeKey, 'Cutoff Time (ms):', cutoff);
  
    this.metrics = this.originalMetrics.map(metric => {
      const filteredValues = metric.values.filter((v: any) => {
        const timestampMs = v[0] * 1000;
        return (now - timestampMs) <= cutoff;
      });
  
      console.log(metric.metric?.__name__, 'Filtered Values:', filteredValues);
  console.log('new metric:', { ...metric, values: filteredValues });
      return { ...metric, values: filteredValues };
    });
  }
  

  get filteredMetrics() {
    const search = this.searchTerm.toLowerCase();
    return this.metrics.filter(m =>
      m.metric.__name__.toLowerCase().includes(search)
    );
  }

  onChartTypeSelect(metricName: string, chartType: string) {
    this.chartOverrides[metricName] = chartType;
  }

  handleChartTypeChange(event: Event, metricName: string): void {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.onChartTypeSelect(metricName, selectedType);
  }

  toggleCompare(metricName: string) {
    const index = this.compareList.indexOf(metricName);
    if (index >= 0) {
      this.compareList.splice(index, 1);
    } else {
      this.compareList.push(metricName);
    }
  }

  openCompareModal() {
    this.showCompareModal = true;
  }

  closeCompareModal() {
    this.showCompareModal = false;
    this.compareList = [];
  }

  async exportAllToPDF() {
    const input = this.pdfContainer.nativeElement;

    const canvas = await html2canvas(input, {
      scrollY: -window.scrollY,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('dashboard_export.pdf');
  }
  get allMetricNames(): string[] {
    return this.metrics.map(m => m.metric.__name__);
  }
  

  getValuesForMetric(metricName: string): any[] {
    const match = this.metrics.find(m => m.metric.__name__ === metricName);
    return match?.values || [];
  }
  
}
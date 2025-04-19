import { Component, Input, Output, EventEmitter,OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.css']
})
export class CompareModalComponent implements OnChanges,OnInit {
  @Input() compareList: string[] = []; // Shown charts
  @Input() selectedCompareList: string[] = []; // Multi-select sync
  @Input() chartOverrides: Record<string, string> = {};
  @Input() chartTypes: string[] = [];
  @Input() allMetricNames: string[] = [];
  @Input() getValuesForMetric!: (metricName: string) => any[];
  @Output() close = new EventEmitter<void>();
  @Output() updateChartType = new EventEmitter<{ metricName: string; chartType: string }>();
  @Output() updateCompareList = new EventEmitter<string[]>();

constructor(){
  console.log('compare modal constructor',this.compareList,this.selectedCompareList,this.chartOverrides,this.chartTypes,this.allMetricNames);
}
ngOnInit(): void {
    console.log('Initializing Compare Modal',this.compareList,this.selectedCompareList,this.chartOverrides,this.chartTypes,this.allMetricNames);
}
ngOnChanges(changes: SimpleChanges): void {
  console.log('Input changes:', changes);
  if (changes['compareList']) {
    console.log('compareList:', this.compareList);
  }
}
  removeFromCompare(metricName: string) {
    const updated = this.compareList.filter(name => name !== metricName);
    this.updateCompareList.emit(updated);
  }

  handleTypeChange(event: Event, metricName: string) {
    const chartType = (event.target as HTMLSelectElement).value;
    this.updateChartType.emit({ metricName, chartType });
  }

  handleMultiSelectChange(event: any) {
    this.updateCompareList.emit(this.selectedCompareList);
  }
}

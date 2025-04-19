import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.css']
})
export class HeatmapChartComponent implements OnChanges {
  @Input() metricName!: string;
  @Input() values: any[] = [];

  chartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values'] || changes['metricName']) {
      this.generateChartOptions();
    }
  }

  generateChartOptions(): void {
    if (!this.values || this.values.length === 0) {
      this.chartOptions = {};
      return;
    }

    const parsedValues = this.values.map(v => parseFloat(v[1]));
    const min = Math.min(...parsedValues);
    const max = Math.max(...parsedValues);
    const avg = +(parsedValues.reduce((a, b) => a + b, 0) / parsedValues.length).toFixed(2);

    const xLabels = this.values.map(v =>
      new Date(v[0] * 1000).toLocaleTimeString()
    );
    const yLabels = ['Metric']; // single-row heatmap for simplicity
    const heatData = this.values.map((v, i) => [i, 0, parseFloat(v[1])]);

    this.chartOptions = {
      title: {
        text: this.metricName,
        left: 'center',
        textStyle: { fontWeight: 'bold', fontSize: 16 }
      },
      tooltip: {
        position: 'top',
        formatter: (params: any) => `${xLabels[params.data[0]]}: ${params.data[2]}`
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {}
        },
        right: '10%'
      },
      graphic: {
        type: 'group',
        left: '10%',
        top: 0,
        children: [
          { type: 'text', style: { text: `Min: ${min}`, fill: '#bbb', font: '12px sans-serif' }, top: 0 },
          { type: 'text', style: { text: `Max: ${max}`, fill: '#bbb', font: '12px sans-serif' }, top: 18 },
          { type: 'text', style: { text: `Avg: ${avg}`, fill: '#bbb', font: '12px sans-serif' }, top: 36 }
        ]
      },
      xAxis: {
        type: 'category',
        data: xLabels,
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: yLabels,
        splitArea: { show: true }
      },
      visualMap: {
        min,
        max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [
        {
          name: this.metricName,
          type: 'heatmap',
          data: heatData,
          label: { show: true },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}

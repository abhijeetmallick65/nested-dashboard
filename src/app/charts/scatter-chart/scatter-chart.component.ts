import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnChanges {
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

    const scatterData = this.values.map(v => [v[0] * 1000, parseFloat(v[1])]);

    this.chartOptions = {
      title: {
        text: this.metricName,
        left: 'center',
        textStyle: { fontWeight: 'bold', fontSize: 16 }
      },
      tooltip: { trigger: 'item' },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {},
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
        type: 'time',
        name: 'Time'
      },
      yAxis: {
        type: 'value',
        name: 'Value'
      },
      dataZoom: [
        { type: 'inside' },
        { type: 'slider' }
      ],
      series: [
        {
          name: this.metricName,
          type: 'scatter',
          symbolSize: 10,
          data: scatterData
        }
      ]
    };
  }
}

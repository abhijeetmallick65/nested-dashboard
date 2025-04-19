import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {
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

    const pieData = this.values.map(v => ({
      name: new Date(v[0] * 1000).toLocaleTimeString(),
      value: parseFloat(v[1])
    }));

    this.chartOptions = {
      title: {
        text: this.metricName,
        left: 'center',
        textStyle: { fontWeight: 'bold', fontSize: 16 }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
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
      series: [
        {
          name: this.metricName,
          type: 'pie',
          radius: '60%',
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}

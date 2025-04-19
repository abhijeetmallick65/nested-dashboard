import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
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
      this.chartOptions = {}; // Or show empty state
      return;
    }

    const yValues = this.values.map(v => parseFloat(v[1]));
    const min = Math.min(...yValues);
    const max = Math.max(...yValues);
    const avg = +(yValues.reduce((a, b) => a + b, 0) / yValues.length).toFixed(2);

    const chartData = this.values.map(v => [v[0] * 1000, parseFloat(v[1])]);

    this.chartOptions = {
      title: {
        text: this.metricName,
        left: 'center',
        textStyle: { fontWeight: 'bold', fontSize: 16 }
      },
      tooltip: { trigger: 'axis' },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {},
          restore: {}
        },
        right: '10%'
      },
      grid: {
        top: 60,
        bottom: 50,
        left: 60,
        right: 60
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
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2, color: '#00b8ff' },
          itemStyle: { color: '#00c9a7' },
          areaStyle: { color: 'rgba(0, 184, 255, 0.15)' },
          data: chartData,
          markArea: {
            silent: true,
            data: [
              [
                {
                  yAxis: 80,
                  itemStyle: {
                    color: 'rgba(255, 0, 0, 0.12)'
                  }
                },
                { yAxis: 1000 }
              ]
            ]
          }
        }
      ]
    };
  }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sankey-chart',
  templateUrl: './sankey-chart.component.html',
  styleUrls: ['./sankey-chart.component.css']
})
export class SankeyChartComponent implements OnChanges {
  @Input() metricName!: string;
  @Input() values: any[] = [];

  chartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values'] || changes['metricName']) {
      this.generateChartOptions();
    }
  }

  generateChartOptions(): void {
    if (!this.values || this.values.length < 2) {
      this.chartOptions = {};
      return;
    }

    const parsedValues = this.values.map(v => parseFloat(v[1]));
    const min = Math.min(...parsedValues);
    const max = Math.max(...parsedValues);
    const avg = +(parsedValues.reduce((a, b) => a + b, 0) / parsedValues.length).toFixed(2);

    const nodes = new Set<string>();
    const links: any[] = [];
    const linkSet = new Set<string>();

    for (let i = 0; i < this.values.length - 1; i++) {
      const src = new Date(this.values[i][0] * 1000).toLocaleTimeString();
      const tgt = new Date(this.values[i + 1][0] * 1000).toLocaleTimeString();
      const val = this.values[i + 1][1];

      const linkKey = `${src}->${tgt}`;
      if (src !== tgt && !linkSet.has(linkKey)) {
        nodes.add(src);
        nodes.add(tgt);
        links.push({ source: src, target: tgt, value: val });
        linkSet.add(linkKey);
      }
    }

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
          type: 'sankey',
          layout: 'none',
          data: Array.from(nodes).map(name => ({ name })),
          links: links,
          focusNodeAdjacency: true,
          itemStyle: { borderWidth: 1, borderColor: '#aaa' },
          lineStyle: { color: 'source', curveness: 0.5 }
        }
      ]
    };
  }
}

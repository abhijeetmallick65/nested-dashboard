// src/app/models/section.model.ts
export interface Metric {
    metric: { __name__: string; job: string };
    values: [number, string][];
    chart_type: string;
  }
  
  export interface Section {
    id: number;
    layout: 'horizontal' | 'vertical';
    metrics: any[];
    sections: Section[];
  }
  
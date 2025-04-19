# Nested Section Rendering

**UI**: [https://mini-grafana.netlify.app](https://mini-grafana.netlify.app)  
**API**:  
- [https://dashboard-api-88av.onrender.com/sections](https://dashboard-api-88av.onrender.com/sections)  
- [https://dashboard-api-88av.onrender.com/flat](https://dashboard-api-88av.onrender.com/flat)

---

This document explains how the nested section system works in the Angular dashboard application. The design allows charts and sections to be organized and rendered recursively, entirely based on a structured JSON configuration.

---

## Overview

Each section in the dashboard can contain:

1. A set of **metrics**, which are displayed as charts  
2. A list of **nested sections**, each of which follows the same structure  
3. A **layout** setting that determines if its children are rendered vertically or horizontally

---

## Section Interface

```ts
interface Section {
  id: number | string;
  layout: 'horizontal' | 'vertical';
  metrics: Metric[];
  sections: Section[];
}
```

---

## Metric Interface

```ts
interface Metric {
  metricName: string;
  chartType: string;
  job: string;
  data: [number, string][];
}
```

---

## NestedDashboardComponent

This is the top-level entry point for rendering the nested layout. It:

- Loads the `sections.json` from the backend (via HTTP)
- Iterates through the top-level sections
- Renders each one using `SectionComponent`

---

## SectionComponent

This is the core of the recursive rendering. It receives a section object as an input and:

- Renders its own metrics as charts
- Recursively renders any child sections
- Handles layout logic for horizontal or vertical direction
- Provides buttons to override layout at runtime

Each section is completely self-contained, meaning layout changes do not affect parent or sibling sections.

---

## Layout Logic

Every section has a default layout (`horizontal` or `vertical`) defined in the JSON. The component also supports runtime layout switching using local state.

The layout is applied using Flexbox via Angular's `[ngStyle]`:

```html
<div [ngStyle]="{ 'flex-direction': getFlexDirection() }">
```

The direction is determined with:

```ts
getFlexDirection(): string {
  if (currentLayout === 'horizontal') return 'row';
  if (currentLayout === 'vertical') return 'column';
  return section.layout === 'horizontal' ? 'row' : 'column';
}
```

---

## Chart Rendering

Each metric is passed into `ChartWrapperComponent`, which uses Angular’s `ngSwitch` to render the appropriate chart component.

---

## Layout Overrides

Each section includes three buttons:

- Original
- Horizontal
- Vertical

Clicking one sets `currentLayout`, which temporarily overrides the layout defined in JSON. This affects only that section and is preserved locally in the component.


---

# Flat Dashboard - Architecture and Logic

This document explains the structure and rendering logic behind the **flat dashboard view** of the Angular application. This version displays a list of metrics as independent charts, without nested sections or recursive rendering.

---

## Overview

The flat dashboard is built to provide a simple, high-performance interface for rendering time-series metrics directly. Each metric appears as an independent chart panel, using data fetched from a static or hosted JSON API.

---

## Data Source

The dashboard loads metric data from the following endpoint:

```
GET https://dashboard-api-88av.onrender.com/flat
```

Expected structure:

```json
{
  "metrics": [
    {
      "metric": {
        "__name__": "cpu_usage",
        "job": "node-exporter"
      },
      "chartType": "line",
      "values": [
        [timestamp, value],
        ...
      ]
    },
    ...
  ]
}
```

---

## Metric Interface

```ts
interface Metric {
  metric: {
    __name__: string;
    job: string;
  };
  chartType: string;
  values: [number, string][];
}
```

The `chartType` field determines how the metric will be visualized (`line`, `bar`, etc.).

---

## DashboardComponent

This is the main component responsible for:

- Fetching the metrics list from the `/flat` API
- Storing and displaying them in a grid layout
- Passing each metric into `ChartWrapperComponent` for rendering
- Optionally supporting features like filtering, time range, or compare mode

---

## ChartWrapperComponent

Each metric is rendered through `ChartWrapperComponent`, which uses Angular’s `ngSwitch` to dynamically display the appropriate chart type.

Supported chart types include:

- Line
- Bar
- Area
- Scatter
- Pie
- Gauge
- Heatmap
- Treemap
- Radar
- Sankey

---

## Rendering Logic

1. The dashboard fetches the `metrics` array from the backend.
2. Each metric is passed into `ChartWrapperComponent` from dashboard component.
3. The wrapper inspects the `chartType` and renders the correct chart.
4. All charts are displayed in a scrollable grid or stacked layout.

---

## Example Layout

```
[Chart: CPU Usage (Line)]
[Chart: Memory (Bar)]
[Chart: Disk IO (Area)]
...
```

Each chart is rendered independently and presented in the order received from the backend.

---

## Features

- Supports multiple chart types out of the box
- Dynamically renders based on data structure
- Easily extendable with filtering, comparison, or detail modals
- Clean UI using Flexbox layout

---


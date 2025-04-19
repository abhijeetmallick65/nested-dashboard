Absolutely — here’s your entire README, cleanly formatted in Markdown and pasted below:

---

# Nested Section Rendering - Architecture and Logic

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


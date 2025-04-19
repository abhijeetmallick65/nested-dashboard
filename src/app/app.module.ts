import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { AreaChartComponent } from './charts/area-chart/area-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { HeatmapChartComponent } from './charts/heatmap-chart/heatmap-chart.component';
import { ScatterChartComponent } from './charts/scatter-chart/scatter-chart.component';
import { GaugeChartComponent } from './charts/gauge-chart/gauge-chart.component';
import { TreemapChartComponent } from './charts/treemap-chart/treemap-chart.component';
import { SankeyChartComponent } from './charts/sankey-chart/sankey-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';
import { ChartViewModalComponent } from './components/chart-view-modal/chart-view-modal.component';
import { CompareModalComponent } from './compare-modal/compare-modal.component';
import { SectionComponent } from './section/section.component';
import { NestedDashboardComponent } from './nested-dashboard/nested-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    AreaChartComponent,
    RadarChartComponent,
    HeatmapChartComponent,
    ScatterChartComponent,
    GaugeChartComponent,
    TreemapChartComponent,
    SankeyChartComponent,
    ChartWrapperComponent,
    ChartViewModalComponent,
    CompareModalComponent,
    SectionComponent,
    NestedDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //charts
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

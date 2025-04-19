import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SankeyChartComponent } from './sankey-chart.component';

describe('SankeyChartComponent', () => {
  let component: SankeyChartComponent;
  let fixture: ComponentFixture<SankeyChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SankeyChartComponent]
    });
    fixture = TestBed.createComponent(SankeyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

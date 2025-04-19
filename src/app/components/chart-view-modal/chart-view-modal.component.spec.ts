import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewModalComponent } from './chart-view-modal.component';

describe('ChartViewModalComponent', () => {
  let component: ChartViewModalComponent;
  let fixture: ComponentFixture<ChartViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartViewModalComponent]
    });
    fixture = TestBed.createComponent(ChartViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

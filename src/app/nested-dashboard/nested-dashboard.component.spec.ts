import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedDashboardComponent } from './nested-dashboard.component';

describe('NestedDashboardComponent', () => {
  let component: NestedDashboardComponent;
  let fixture: ComponentFixture<NestedDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NestedDashboardComponent]
    });
    fixture = TestBed.createComponent(NestedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareModalComponent } from './compare-modal.component';

describe('CompareModalComponent', () => {
  let component: CompareModalComponent;
  let fixture: ComponentFixture<CompareModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareModalComponent]
    });
    fixture = TestBed.createComponent(CompareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

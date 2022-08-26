import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientView2Component } from './patient-view2.component';

describe('PatientView2Component', () => {
  let component: PatientView2Component;
  let fixture: ComponentFixture<PatientView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

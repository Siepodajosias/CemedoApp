import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientView3Component } from './patient-view3.component';

describe('PatientView3Component', () => {
  let component: PatientView3Component;
  let fixture: ComponentFixture<PatientView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientView3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

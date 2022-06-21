import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRechercherComponent } from './patient-rechercher.component';

describe('PatientRechercherComponent', () => {
  let component: PatientRechercherComponent;
  let fixture: ComponentFixture<PatientRechercherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRechercherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRechercherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacienFormsComponent } from './pharmacien-forms.component';

describe('PharmacienFormsComponent', () => {
  let component: PharmacienFormsComponent;
  let fixture: ComponentFixture<PharmacienFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacienFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacienFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

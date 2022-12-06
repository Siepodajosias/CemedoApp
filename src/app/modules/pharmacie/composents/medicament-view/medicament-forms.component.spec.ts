import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentFormsComponent } from 'src/app/modules/pharmacie/composents/medicament-view/medicament-forms.component';

describe('MedicamentFormsComponent', () => {
  let component: MedicamentFormsComponent;
  let fixture: ComponentFixture<MedicamentFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

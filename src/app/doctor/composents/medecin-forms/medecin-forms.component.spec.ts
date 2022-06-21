import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinFormsComponent } from './medecin-forms.component';

describe('MedecinFormsComponent', () => {
  let component: MedecinFormsComponent;
  let fixture: ComponentFixture<MedecinFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentRechercheComponent } from './medicament-recherche.component';

describe('MedicamentRechercheComponent', () => {
  let component: MedicamentRechercheComponent;
  let fixture: ComponentFixture<MedicamentRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

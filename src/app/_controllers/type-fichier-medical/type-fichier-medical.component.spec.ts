import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFichierMedicalComponent } from './type-fichier-medical.component';

describe('TypeFichierMedicalComponent', () => {
  let component: TypeFichierMedicalComponent;
  let fixture: ComponentFixture<TypeFichierMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeFichierMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeFichierMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMedecinComponent } from './type-medecin.component';

describe('TypeMedecinComponent', () => {
  let component: TypeMedecinComponent;
  let fixture: ComponentFixture<TypeMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

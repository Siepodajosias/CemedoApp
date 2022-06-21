import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinRechercheComponent } from './medecin-recherche.component';

describe('MedecinRechercheComponent', () => {
  let component: MedecinRechercheComponent;
  let fixture: ComponentFixture<MedecinRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

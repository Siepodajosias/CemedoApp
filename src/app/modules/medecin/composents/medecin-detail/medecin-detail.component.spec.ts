import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinDetailComponent } from 'src/app/modules/medecin/composents/medecin-detail/medecin-detail.component';

describe('MedecinDetailComponent', () => {
  let component: MedecinDetailComponent;
  let fixture: ComponentFixture<MedecinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

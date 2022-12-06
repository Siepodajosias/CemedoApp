import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousCalendrierComponent } from 'src/app/modules/medecin/composents/rendez-vous-calendrier/rendez-vous-calendrier.component';

describe('RendezVousCalendrierComponent', () => {
  let component: RendezVousCalendrierComponent;
  let fixture: ComponentFixture<RendezVousCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezVousCalendrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

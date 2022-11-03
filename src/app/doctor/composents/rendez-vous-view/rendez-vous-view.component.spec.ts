import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousViewComponent } from './rendez-vous-view.component';

describe('RendezVousViewComponent', () => {
  let component: RendezVousViewComponent;
  let fixture: ComponentFixture<RendezVousViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezVousViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

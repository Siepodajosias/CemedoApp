import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedecinCalendrierComponent } from 'src/app/modules/medecin/composents/medecin-calendrier/medecin-calendrier.component';



describe('MedecinCalendrierComponent', () => {
  let component: MedecinCalendrierComponent;
  let fixture: ComponentFixture<MedecinCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinCalendrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

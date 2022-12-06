import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielViewComponent } from 'src/app/modules/logistique/composents/materiel-view/materiel-view.component';

describe('MaterielViewComponent', () => {
  let component: MaterielViewComponent;
  let fixture: ComponentFixture<MaterielViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterielViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

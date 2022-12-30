import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueComponent } from 'src/app/modules/assurance/composent/statistique/statistique.component';

describe('StatistiqueComponent', () => {
  let component: StatistiqueComponent;
  let fixture: ComponentFixture<StatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

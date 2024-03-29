import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceComponent } from 'src/app/modules/patient/composents/ordonnance/ordonnance.component';

describe('OrdonnanceComponent', () => {
  let component: OrdonnanceComponent;
  let fixture: ComponentFixture<OrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

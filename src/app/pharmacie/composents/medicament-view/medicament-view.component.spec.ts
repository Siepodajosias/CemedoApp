import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentViewComponent } from './medicament-view.component';

describe('MedicamentViewComponent', () => {
  let component: MedicamentViewComponent;
  let fixture: ComponentFixture<MedicamentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

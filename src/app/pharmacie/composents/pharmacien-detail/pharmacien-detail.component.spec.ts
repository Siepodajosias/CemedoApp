import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacienDetailComponent } from './pharmacien-detail.component';

describe('PharmacienDetailComponent', () => {
  let component: PharmacienDetailComponent;
  let fixture: ComponentFixture<PharmacienDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacienDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacienDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

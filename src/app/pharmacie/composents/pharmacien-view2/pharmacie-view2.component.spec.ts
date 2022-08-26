import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacienView2Component } from './pharmacien-view2.component';

describe('PharmacieView2Component', () => {
  let component: PharmacienView2Component;
  let fixture: ComponentFixture<PharmacienView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacienView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacienView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

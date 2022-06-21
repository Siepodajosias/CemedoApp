import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPharmacieComponent } from './dashboard-pharmacie.component';

describe('DashboardPharmacieComponent', () => {
  let component: DashboardPharmacieComponent;
  let fixture: ComponentFixture<DashboardPharmacieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPharmacieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssuranceComponent } from 'src/app/modules/assurance/dashboard-assurance/dashboard-assurance.component';

describe('DashboardAssuranceComponent', () => {
  let component: DashboardAssuranceComponent;
  let fixture: ComponentFixture<DashboardAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAssuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

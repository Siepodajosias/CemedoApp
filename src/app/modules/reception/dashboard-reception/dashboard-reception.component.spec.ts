import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReceptionComponent } from 'src/app/modules/reception/dashboard-reception/dashboard-reception.component';

describe('DashboardReceptionComponent', () => {
  let component: DashboardReceptionComponent;
  let fixture: ComponentFixture<DashboardReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardReceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

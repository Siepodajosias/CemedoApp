import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfirmerieComponent } from './dashboard-infirmerie.component';

describe('DashboardInfirmierComponent', () => {
  let component: DashboardInfirmerieComponent;
  let fixture: ComponentFixture<DashboardInfirmerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInfirmerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInfirmerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

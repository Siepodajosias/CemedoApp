import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInformatiqueComponent } from './dashboard-informatique.component';

describe('DashboardInformatiqueComponent', () => {
  let component: DashboardInformatiqueComponent;
  let fixture: ComponentFixture<DashboardInformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInformatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

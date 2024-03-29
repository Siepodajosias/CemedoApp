import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionDetailComponent } from 'src/app/modules/reception/composents/reception-detail/reception-detail.component';

describe('ReceptionDetailComponent', () => {
  let component: ReceptionDetailComponent;
  let fixture: ComponentFixture<ReceptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionViewComponent } from 'src/app/modules/reception/composents/reception-view/reception-view.component';

describe('ReceptionViewComponent', () => {
  let component: ReceptionViewComponent;
  let fixture: ComponentFixture<ReceptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

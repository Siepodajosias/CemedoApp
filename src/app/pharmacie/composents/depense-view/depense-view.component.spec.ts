import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseViewComponent } from './depense-view.component';

describe('DepenseViewComponent', () => {
  let component: DepenseViewComponent;
  let fixture: ComponentFixture<DepenseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

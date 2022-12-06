import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceView2Component } from 'src/app/modules/assurance/composent/assurance-view2/assurance-view2.component';

describe('AssuranceView2Component', () => {
  let component: AssuranceView2Component;
  let fixture: ComponentFixture<AssuranceView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuranceView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuranceView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

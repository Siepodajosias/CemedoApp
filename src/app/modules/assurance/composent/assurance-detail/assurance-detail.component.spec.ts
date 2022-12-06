import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceDetailComponent } from 'src/app/modules/assurance/composent/assurance-detail/assurance-detail.component';

describe('AssuranceDetailComponent', () => {
  let component: AssuranceDetailComponent;
  let fixture: ComponentFixture<AssuranceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuranceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

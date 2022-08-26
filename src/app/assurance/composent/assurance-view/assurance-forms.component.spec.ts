import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceFormsComponent } from './assurance-forms.component';

describe('AssuranceFormsComponent', () => {
  let component: AssuranceFormsComponent;
  let fixture: ComponentFixture<AssuranceFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuranceFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuranceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableAssuranceComponent } from './responsable-assurance.component';

describe('ResponsableAssuranceComponent', () => {
  let component: ResponsableAssuranceComponent;
  let fixture: ComponentFixture<ResponsableAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableAssuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

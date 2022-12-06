import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableDetailComponent } from 'src/app/modules/assurance/composent/responsable-detail/responsable-detail.component';

describe('ResponsableDetailComponent', () => {
  let component: ResponsableDetailComponent;
  let fixture: ComponentFixture<ResponsableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

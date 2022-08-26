import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierFormsComponent } from './infirmier-forms.component';

describe('InfirmierFormsComponent', () => {
  let component: InfirmierFormsComponent;
  let fixture: ComponentFixture<InfirmierFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

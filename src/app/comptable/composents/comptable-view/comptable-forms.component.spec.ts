import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableFormsComponent } from './comptable-forms.component';

describe('ComptableFormsComponent', () => {
  let component: ComptableFormsComponent;
  let fixture: ComponentFixture<ComptableFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptableFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEmployeComponent } from './type-employe.component';

describe('TypeEmployeComponent', () => {
  let component: TypeEmployeComponent;
  let fixture: ComponentFixture<TypeEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierComponent } from './infirmier.component';

describe('InfirmierComponent', () => {
  let component: InfirmierComponent;
  let fixture: ComponentFixture<InfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

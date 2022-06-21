import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierViewComponent } from './infirmier-view.component';

describe('InfirmierViewComponent', () => {
  let component: InfirmierViewComponent;
  let fixture: ComponentFixture<InfirmierViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

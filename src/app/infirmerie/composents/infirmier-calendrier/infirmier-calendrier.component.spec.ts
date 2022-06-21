import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierCalendrierComponent } from './infirmier-calendrier.component';

describe('InfirmierCalendrierComponent', () => {
  let component: InfirmierCalendrierComponent;
  let fixture: ComponentFixture<InfirmierCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierCalendrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

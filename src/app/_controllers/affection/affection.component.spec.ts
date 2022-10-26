import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectionComponent } from './affection.component';

describe('AffectionComponent', () => {
  let component: AffectionComponent;
  let fixture: ComponentFixture<AffectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

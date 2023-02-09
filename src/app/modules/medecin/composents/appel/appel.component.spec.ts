import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelComponent } from 'src/app/modules/medecin/composents/appel/appel.component';

describe('AppelComponent', () => {
  let component: AppelComponent;
  let fixture: ComponentFixture<AppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

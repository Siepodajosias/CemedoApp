import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinView2Component } from './medecin-view2.component';

describe('MedecinView2Component', () => {
  let component: MedecinView2Component;
  let fixture: ComponentFixture<MedecinView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacienViewComponent } from 'src/app/modules/pharmacie/composents/pharmacien-view/pharmacien-view.component';

describe('PharmacienViewComponent', () => {
  let component: PharmacienViewComponent;
  let fixture: ComponentFixture<PharmacienViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacienViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacienViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenViewComponent } from 'src/app/modules/infirmerie/composents/examen-view/examen-view.component';

describe('ExamenViewComponent', () => {
  let component: ExamenViewComponent;
  let fixture: ComponentFixture<ExamenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformaticienViewComponent } from './informaticien-view.component';

describe('InformaticienViewComponent', () => {
  let component: InformaticienViewComponent;
  let fixture: ComponentFixture<InformaticienViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformaticienViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformaticienViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

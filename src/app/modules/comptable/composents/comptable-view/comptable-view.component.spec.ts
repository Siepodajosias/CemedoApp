import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableViewComponent } from 'src/app/modules/comptable/composents/comptable-view/comptable-view.component';

describe('ComptableViewComponent', () => {
  let component: ComptableViewComponent;
  let fixture: ComponentFixture<ComptableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

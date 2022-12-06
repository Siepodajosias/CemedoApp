import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableDetailComponent } from 'src/app/modules/comptable/composents/comptable-detail/comptable-detail.component';

describe('ComptableDetailComponent', () => {
  let component: ComptableDetailComponent;
  let fixture: ComponentFixture<ComptableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptableDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

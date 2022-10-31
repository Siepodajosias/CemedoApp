import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteViewComponent } from './vente-view.component';

describe('VenteViewComponent', () => {
  let component: VenteViewComponent;
  let fixture: ComponentFixture<VenteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

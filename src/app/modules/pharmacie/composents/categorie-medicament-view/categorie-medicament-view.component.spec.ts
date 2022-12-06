import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieMedicamentViewComponent } from 'src/app/modules/pharmacie/composents/categorie-medicament-view/categorie-medicament-view.component';

describe('CategorieMedicamentViewComponent', () => {
  let component: CategorieMedicamentViewComponent;
  let fixture: ComponentFixture<CategorieMedicamentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieMedicamentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieMedicamentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

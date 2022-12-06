import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierDetailComponent } from 'src/app/modules/infirmerie/composents/infirmier-detail/infirmier-detail.component';

describe('InfirmierDetailComponent', () => {
  let component: InfirmierDetailComponent;
  let fixture: ComponentFixture<InfirmierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

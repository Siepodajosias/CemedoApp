import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMedecinComponent } from 'src/app/modules/medecin/composents/profile-medecin/profile-medecin.component';

describe('ProfileMedecinComponent', () => {
  let component: ProfileMedecinComponent;
  let fixture: ComponentFixture<ProfileMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

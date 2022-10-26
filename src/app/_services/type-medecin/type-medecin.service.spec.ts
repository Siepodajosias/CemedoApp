import { TestBed } from '@angular/core/testing';

import { TypeMedecinService } from './type-medecin.service';

describe('TypeMedecinService', () => {
  let service: TypeMedecinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMedecinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

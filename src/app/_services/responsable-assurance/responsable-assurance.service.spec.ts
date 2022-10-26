import { TestBed } from '@angular/core/testing';

import { ResponsableAssuranceService } from './responsable-assurance.service';

describe('ResponsableAssuranceService', () => {
  let service: ResponsableAssuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableAssuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

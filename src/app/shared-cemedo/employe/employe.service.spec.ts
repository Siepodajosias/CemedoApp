import { TestBed } from '@angular/core/testing';

import { EmployeService } from 'src/app/shared-cemedo/employe/employe.service';

describe('EmployeService', () => {
  let service: EmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

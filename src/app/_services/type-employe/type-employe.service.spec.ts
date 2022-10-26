import { TestBed } from '@angular/core/testing';

import { TypeEmployeService } from './type-employe.service';

describe('TypeEmployeService', () => {
  let service: TypeEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InformaticienService } from './informaticien.service';

describe('InformaticienService', () => {
  let service: InformaticienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformaticienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

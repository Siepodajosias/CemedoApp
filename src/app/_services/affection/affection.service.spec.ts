import { TestBed } from '@angular/core/testing';

import { AffectionService } from './affection.service';

describe('AffectionService', () => {
  let service: AffectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

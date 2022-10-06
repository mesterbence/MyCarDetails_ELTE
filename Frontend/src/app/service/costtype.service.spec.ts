import { TestBed } from '@angular/core/testing';

import { CosttypeService } from './costtype.service';

describe('CosttypeService', () => {
  let service: CosttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

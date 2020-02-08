import { TestBed } from '@angular/core/testing';

import { MemorizeService } from './memorize.service';

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemorizeService = TestBed.get(MemorizeService);
    expect(service).toBeTruthy();
  });
});

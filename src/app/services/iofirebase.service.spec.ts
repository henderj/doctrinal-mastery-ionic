import { TestBed } from '@angular/core/testing';

import { IOFirebaseService } from './iofirebase.service';

describe('IOFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IOFirebaseService = TestBed.get(IOFirebaseService);
    expect(service).toBeTruthy();
  });
});

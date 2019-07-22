import { TestBed } from '@angular/core/testing';

import { SignedInService } from './signed-in.service';

describe('SignedInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignedInService = TestBed.get(SignedInService);
    expect(service).toBeTruthy();
  });
});

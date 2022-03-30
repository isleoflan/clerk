import { TestBed } from '@angular/core/testing';

import { ExternalUrlProviderGuard } from './external-url-provider.guard';

describe('ExternalUrlProviderGuard', () => {
  let guard: ExternalUrlProviderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExternalUrlProviderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { KeyExchangeGuard } from './key-exchange.guard';

describe('KeyExchangeGuard', () => {
  let guard: KeyExchangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KeyExchangeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

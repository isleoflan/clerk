import { TestBed } from '@angular/core/testing';

import { BaererInterceptor } from './baerer.interceptor';

describe('BaererInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BaererInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: BaererInterceptor = TestBed.inject(BaererInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

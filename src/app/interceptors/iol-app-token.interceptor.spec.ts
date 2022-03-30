import { TestBed } from '@angular/core/testing';

import { IolAppTokenInterceptor } from './iol-app-token.interceptor';

describe('IolAppTokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [IolAppTokenInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: IolAppTokenInterceptor = TestBed.inject(
      IolAppTokenInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});

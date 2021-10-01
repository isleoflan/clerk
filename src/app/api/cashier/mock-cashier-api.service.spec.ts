import { TestBed } from '@angular/core/testing';

import { MockCashierApiService } from './mock-cashier-api.service';

describe('MockCashierApiService', () => {
  let service: MockCashierApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCashierApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

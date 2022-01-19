import { TestBed } from '@angular/core/testing';

import { CashierApiService } from './cashier-api.service';

describe('CashierApiService', () => {
  let service: CashierApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashierApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

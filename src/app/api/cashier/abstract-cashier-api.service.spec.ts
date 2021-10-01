import { TestBed } from '@angular/core/testing';

import { AbstractCashierApiService } from './abstract-cashier-api.service';

describe('AbstractCashierApiService', () => {
  let service: AbstractCashierApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractCashierApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import {TestBed, waitForAsync} from '@angular/core/testing';
import {OrderDto} from '../../interfaces/dto/order-dto';
import {TopUpDto} from '../../interfaces/dto/top-up-dto';
import {OrderType} from '../../interfaces/enum/order-type';

import {MockCashierApiService} from './mock-cashier-api.service';

describe('MockCashierApiService', () => {
  let service: MockCashierApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCashierApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have created 20 products', waitForAsync(() => {
    const products$ = service.getProducts();

    products$.subscribe((result) => {
      expect(result.data.length).toEqual(20);
    });
  }));

  it('should have created a badge with balance over CHF 10', waitForAsync(() => {
    const badge$ = service.getBadge('123ASD');

    badge$.subscribe((result) => {
      expect(result.data.balance).toBeGreaterThanOrEqual(1000);
    })
  }));

  it('should place an order and return new balance', waitForAsync(() => {
    const orderDto: OrderDto = {
      type: OrderType.BADGE,
      badgeId: '123ASD',
      products: [
        {
          id: 'asdf',
          qty: 1
        },
        {
          id: 'asdf1',
          qty: 1
        }
      ]
    };

    service.placeOrder(orderDto).subscribe((result) => {
      expect(result.data.balance).toBeTruthy();
    });
  }));

  it('should top up badge', waitForAsync(() => {
    const topUpDto: TopUpDto = {
      badgeId: '123ASD',
      topUp: 1000
    }

    service.topUpBadge(topUpDto).subscribe((result) => {
      expect(result.data.balance).toBeTruthy();
      expect(result.data.balance).toEqual(11000);
    })
  }));
});

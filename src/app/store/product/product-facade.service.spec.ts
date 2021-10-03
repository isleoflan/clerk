import { TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {AbstractCashierApiService} from '../../api/cashier/abstract-cashier-api.service';
import {MockCashierApiService} from '../../api/cashier/mock-cashier-api.service';
import {ProductStoreReducer} from './index';

import { ProductFacadeService } from './product-facade.service';

describe('ProductFacadeService', () => {
  let service: ProductFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
         product: ProductStoreReducer.reducer
        })
      ],
      providers: [
        { provide: AbstractCashierApiService, useClass: MockCashierApiService}
      ]
    });
    service = TestBed.inject(ProductFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

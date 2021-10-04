import { TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';

import { CartFacadeService } from './cart-facade.service';
import {CartStoreReducer} from './index';

describe('CartFacadeService', () => {
  let service: CartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cart: CartStoreReducer.reducer
        })
      ]
    });
    service = TestBed.inject(CartFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

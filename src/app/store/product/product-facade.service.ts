import { CartStoreActions } from "@/store/cart";
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, finalize, share, startWith, switchMap, tap } from 'rxjs/operators';
import { AbstractCashierApiService } from '@/api/cashier/abstract-cashier-api.service';
import { AppState } from '../app.state';
import { FacadeService } from '../facade.service';
import { ProductStoreActions, ProductStoreSelectors } from './index';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService extends FacadeService {

  private requireProducts$ = this.store.select(ProductStoreSelectors.selectProductState).pipe(
    finalize(() => this.store.dispatch({type: ProductStoreActions.loadProductsCancel.type})),
    filter(({isLoading, hasLoaded, error}) => !isLoading && !hasLoaded && error === null),
    tap(() => this.store.dispatch({type: ProductStoreActions.loadProducts.type})),
    switchMap(() => this.cashierApiService.getProducts().pipe(
      tap((payload) => {
          payload.data.products[2].gtin = '4006677001209';
          payload.data.products[3].gtin = '003855116900280960020000';

          this.store.dispatch({type: ProductStoreActions.loadProductsSuccess.type, payload})
      }),
      tap((payload) =>
        this.store.dispatch({type: CartStoreActions.setTopUpId.type, id: payload.data.topUp})
      ),
      catchError((error) => {
        this.store.dispatch({type: ProductStoreActions.loadProductsCancel.type, error});
        return of(EMPTY);
      })
    )),
    share()
  );

  products$ = this.muteFirst(
    this.requireProducts$.pipe(startWith(null)),
    this.store.select(ProductStoreSelectors.selectAll)
  );

  productCategories$ = this.muteFirst(
    this.requireProducts$.pipe(startWith(null)),
    this.store.select(ProductStoreSelectors.selectProductsByCategories)
  );

  getProductByGtin$ = (gtin: string) => this.muteFirst(
    this.requireProducts$.pipe(startWith(null)),
    this.store.select(ProductStoreSelectors.selectProductByGtin(gtin))
  );

  constructor(
    private store: Store<AppState>,
    private cashierApiService: AbstractCashierApiService
  ) {
    super();
  }
}

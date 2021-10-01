import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {catchError, filter, finalize, share, startWith, switchMap, tap} from 'rxjs/operators';
import {AbstractCashierApiService} from '../../api/cashier/abstract-cashier-api.service';
import {AppState} from '../app.state';
import {FacadeService} from '../facade.service';
import {ProductStoreActions, ProductStoreSelectors} from './index';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService extends FacadeService{

  private requireProducts$ = this.store.select(ProductStoreSelectors.selectProductState).pipe(
    finalize(() => this.store.dispatch({type: ProductStoreActions.loadProductsCancel.type })),
    filter(({isLoading, hasLoaded, error}) => !isLoading && !hasLoaded && error === null),
    tap(() => this.store.dispatch({type: ProductStoreActions.loadProducts.type})),
    switchMap(() => this.cashierApiService.getProducts().pipe(
      tap((payload) =>
        this.store.dispatch({type: ProductStoreActions.loadProductsSuccess.type, payload})
      ),
      catchError((error) => {
          this.store.dispatch({type: ProductStoreActions.loadProductsCancel.type, error})
          return of(EMPTY);
      })
    )),
    share()
  );

  products$ = this.muteFirst(
    this.requireProducts$.pipe(startWith(null)),
    this.store.select(ProductStoreSelectors.selectAll)
  );

  constructor(
    private store: Store<AppState>,
    private cashierApiService: AbstractCashierApiService
  ) {
    super()
  }
}

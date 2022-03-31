import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { CartStoreActions } from "@/store/cart/index";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs/operators";



@Injectable()
export class CartEffects {

  setTopUpId$ = createEffect(() => this.actions$.pipe(
    ofType(CartStoreActions.setTopUpId.type),
    map(({id}) => ({type: CartStoreActions.addItem.type, id, qty: -1}))
  ));

  onReset$ = createEffect(() => this.actions$.pipe(
    ofType(CartStoreActions.reset),
    mergeMap(() => this.cartFacadeService.topUpId$.pipe(
      map((id) => ({type: CartStoreActions.addItem.type, id, qty: -1}))
    )),
  ));

  constructor(
    private actions$: Actions,
    private cartFacadeService: CartFacadeService
  ) {}
}

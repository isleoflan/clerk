import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {UserInterfaceStoreActions, UserInterfaceStoreSelectors} from './index';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceFacadeService {

  isPaymentPopupVisible$ = this.store.select(UserInterfaceStoreSelectors.selectIsPaymentPopupVisible);

  constructor(
    private store: Store<AppState>
  ) { }

  showPaymentPopup(): void {
    this.store.dispatch({type: UserInterfaceStoreActions.showPaymentPopup.type});
  }
  hidePaymentPopup(): void {
    this.store.dispatch({type: UserInterfaceStoreActions.hidePaymentPopup.type});
  }
}

import { TokenCollection } from '@/interfaces/token-collection';
import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const setTokenCollection = createAction(
  '[Auth] Set Token Collection',
  props<{ tokenCollection: TokenCollection }>()
);

export const initRenewalOfAccessToken = createAction(
  '[Auth] INIT Renewal of Access Token',
  props<{ tokenCollection: TokenCollection }>()
);

export const renewAccessToken = createAction(
  '[Auth] Renew Access Token',
  props<{ refreshToken: string }>()
);

export const renewAccessTokenSuccess = createAction(
  '[Auth] Renew Access Token Success',
  props<{ tokenCollection: TokenCollection }>()
);

export const renewAccessTokenFailure = createAction(
  '[Auth] Renew Access Token Failure',
  props<{ error: HttpErrorResponse }>()
);



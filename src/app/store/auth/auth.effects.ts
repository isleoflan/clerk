import { AuthFacadeService } from '@/store/auth/auth-facade.service';
import {
  setTokenCollection,
  renewAccessToken,
  initRenewalOfAccessToken,
  renewAccessTokenSuccess,
  renewAccessTokenFailure
} from '@/store/auth/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of, switchMap, delay, catchError, tap } from 'rxjs';


@Injectable()
export class AuthEffects {

  setTokenCollection$ = createEffect(() => this.actions$.pipe(
    ofType(setTokenCollection.type),
    map(({tokenCollection}) => {
      const {accessToken, refreshToken, expiration} = tokenCollection;


      window.localStorage.setItem('iol-access-token', accessToken);
      window.localStorage.setItem('iol-refresh-token', refreshToken);
      window.localStorage.setItem('iol-expiration', expiration);
    })
  ), {dispatch: false});

  initRenewalOfAccessToken$ = createEffect(() => this.actions$.pipe(
    ofType(initRenewalOfAccessToken.type),
    switchMap(({tokenCollection}) => {
      const {refreshToken, expiration} = tokenCollection;

      const expirationDate = new Date(expiration);
      const now = new Date();

      if (expirationDate < now) {
        // refresh Token immediately
        return of({type: renewAccessToken.type, refreshToken});
      } else {
        const ttl = Math.floor((expirationDate.getTime() - now.getTime()));
        // plan token refresh
        return of({type: renewAccessToken.type, refreshToken}).pipe(delay(ttl));
      }
    })
  ));

  renewAccessToken$ = createEffect(() => this.actions$.pipe(
    ofType(renewAccessToken.type),
    mergeMap(({refreshToken}) => this.authFacadeService.postKeyRenew({token: refreshToken}).pipe(
      map((payload) => {
        const {accessToken, expiration} = payload.data;

        window.localStorage.setItem('iol-access-token', accessToken);
        window.localStorage.setItem('iol-expiration', expiration.toString());

        return {type: renewAccessTokenSuccess.type, tokenCollection: payload.data};
      }),
      catchError((error: HttpErrorResponse) => {
        return of({type: renewAccessTokenFailure.type, error});
      }))
    )
  ));

  renewAccessTokenFailure$ = createEffect(() => this.actions$.pipe(
    ofType(renewAccessTokenFailure.type),
    map(() => {
      window.localStorage.removeItem('iol-access-token');
      window.localStorage.removeItem('iol-refresh-token');
      window.localStorage.removeItem('iol-expiration');
    }),
    tap(() => {
      void this.router.navigate(['/']);
    })
  ), {dispatch: false});


  renewAccessTokenSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(renewAccessTokenSuccess.type),
    mergeMap(({tokenCollection}) => {
      const {refreshToken, expiration} = tokenCollection;

      const expirationDate = new Date(expiration);
      const now = new Date();
      const ttl = Math.floor((expirationDate.getTime() - now.getTime()));

      // plan token refresh
      return of({type: renewAccessToken.type, refreshToken}).pipe(delay(ttl));
    })
  ));


  constructor(
    private actions$: Actions,
    private authFacadeService: AuthFacadeService,
    private router: Router
  ) {
  }
}

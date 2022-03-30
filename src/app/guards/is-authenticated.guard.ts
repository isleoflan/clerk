import { AuthFacadeService } from '@/store/auth/auth-facade.service';
import { State } from '@/store/auth/auth.reducer';
import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, UrlTree, Router, CanActivate } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Observable, of, map, mergeAll, partition, merge, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivateChild, CanActivate, CanLoad {
  private authState$: Observable<State> = this.authFacadeService.authState$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.isAccessTokenSet();
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.isAccessTokenSet();
  }


  canLoad(): Observable<boolean | UrlTree> {
    return this.isAccessTokenSet();
  }

  private isAccessTokenSet(): Observable<boolean | UrlTree> {

    const [credentialsSet, needsLogin] = partition(
      this.authState$,
      ({accessToken, refreshToken, expiration}) =>
        accessToken !== null
        && refreshToken !== null
        && expiration !== null
    );

    return merge(
      credentialsSet.pipe(
        tap(({accessToken, refreshToken, expiration, refreshStarted}) => {
          if (
            accessToken !== null
            && refreshToken !== null
            && expiration !== null
            && (typeof refreshStarted === 'undefined' || refreshStarted === false)
          ) {
            this.authFacadeService.initRenewOfAccessToken({accessToken, refreshToken, expiration});
          }
        }),
        filter(({refreshStarted, expiration}) =>
          refreshStarted === true && expiration !== null && new Date(expiration) > new Date()
        ),
        map(() => of(true))
      ),
      needsLogin.pipe(map(() => this.authFacadeService.postLoginRequest().pipe(
        map((payload) => {
          return this.router.createUrlTree(['/redirect', {externalUrl: payload.data.redirect}]);
        })
      )))
    ).pipe(
      mergeAll(2)
    );
  }
}

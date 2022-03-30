import { AuthApiService } from '@/api/auth-api.service';
import { AppState } from '@/store/app.state';
import { FacadeService } from '@/store/facade.service';
import { UserStoreSelectors, UserStoreActions } from '@/store/user/index';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, filter, tap, switchMap, catchError, of, EMPTY, share, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService extends FacadeService {

  private requireUser$ = this.store.select(UserStoreSelectors.selectUserState).pipe(
    finalize(() => this.store.dispatch({type: UserStoreActions.loadUserCancel.type})),
    filter(({isLoading, hasLoaded, error}) => !isLoading && !hasLoaded && error === null),
    tap(() => this.store.dispatch({type: UserStoreActions.loadUser.type})),
    switchMap(() => this.authApiService.getUser().pipe(
      tap((payload) => this.store.dispatch({type: UserStoreActions.loadUserSuccess.type, payload})),
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch({type: UserStoreActions.loadUserFailure.type, error});
        return of(EMPTY);
      })
    )),
    share()
  );

  user$ = this.muteFirst(
    this.requireUser$.pipe(startWith(null)),
    this.store.select(UserStoreSelectors.selectUser)
  );

  constructor(
    private store: Store<AppState>,
    private authApiService: AuthApiService
  ) {
    super();
  }
}

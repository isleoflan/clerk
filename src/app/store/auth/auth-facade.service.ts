import { AbstractAuthApiService } from '@/api/abstract-auth-api.service';
import { KeyExchangeDto } from '@/interfaces/dto/key-exchange-dto';
import { KeyRenewDto } from '@/interfaces/dto/key-renew-dto';
import { LoginRequestDto } from '@/interfaces/dto/login-request-dto';
import { Payload } from '@/interfaces/payload';
import { LoginRequestPayload } from '@/interfaces/payload/login-request-payload';
import { TokenCollection } from '@/interfaces/token-collection';
import { AppState } from '@/store/app.state';
import { AuthStoreSelectors, AuthStoreActions } from '@/store/auth/index';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  authState$ = this.store.select(AuthStoreSelectors.selectAuthState);

  constructor(
    private store: Store<AppState>,
    private authApiService: AbstractAuthApiService
  ) {
  }

  setTokenCollection(tokenCollection: TokenCollection): void {
    this.store.dispatch({type: AuthStoreActions.setTokenCollection.type, tokenCollection});
  }

  postLoginRequest(): Observable<Payload<LoginRequestPayload>> {
    const loginRequestDto: LoginRequestDto = {
      redirectURL: environment.iolSsoRedirectUrl
    };

    return this.authApiService.postLoginRequest(loginRequestDto);
  }

  postKeyExchange(keyExchangeDto: KeyExchangeDto): Observable<Payload<TokenCollection>> {
    return this.authApiService.postKeyExchange(keyExchangeDto).pipe(
      tap((payload) => {
        this.setTokenCollection(payload.data);
      })
    );
  }

  postKeyRenew(keyRenewDto: KeyRenewDto): Observable<Payload<TokenCollection>> {
    return this.authApiService.postKeyRenew(keyRenewDto);
  }

  initRenewOfAccessToken(tokenCollection: TokenCollection): void {
    this.store.dispatch({type: AuthStoreActions.initRenewalOfAccessToken.type, tokenCollection});
  }
}

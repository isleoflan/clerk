import { KeyExchangeDto } from '@/interfaces/dto/key-exchange-dto';
import { KeyRenewDto } from '@/interfaces/dto/key-renew-dto';
import { LoginRequestDto } from '@/interfaces/dto/login-request-dto';
import { Payload } from '@/interfaces/payload';
import { LoginRequestPayload } from '@/interfaces/payload/login-request-payload';
import { UserPayload } from '@/interfaces/payload/user-payload';
import { TokenCollection } from '@/interfaces/token-collection';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { AbstractAuthApiService } from './abstract-auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AbstractAuthApiService {

  ssoUrl = 'https://api.sso.isleoflan.ch/v1';

  constructor(private http: HttpClient) {
  }

  postLoginRequest(loginRequestDto: LoginRequestDto): Observable<Payload<LoginRequestPayload>> {
    return this.http.post<Payload<LoginRequestPayload>>(
      this.ssoUrl + '/auth/request',
      {...loginRequestDto}
    ).pipe(first());
  }

  postKeyExchange(keyExchangeDto: KeyExchangeDto): Observable<Payload<TokenCollection>> {
    return this.http.post<Payload<TokenCollection>>(
      this.ssoUrl + '/key/exchange',
      {...keyExchangeDto}
    );
  }

  postKeyRenew(keyRenewDto: KeyRenewDto): Observable<Payload<TokenCollection>> {
    return this.http.post<Payload<TokenCollection>>(
      this.ssoUrl + '/key/renew',
      {...keyRenewDto}
    );
  }

  getUser(): Observable<Payload<UserPayload>> {
    return this.http.get<Payload<UserPayload>>(this.ssoUrl + '/user/info');
  }
}

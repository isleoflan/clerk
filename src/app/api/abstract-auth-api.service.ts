import { KeyExchangeDto } from '@/interfaces/dto/key-exchange-dto';
import { KeyRenewDto } from '@/interfaces/dto/key-renew-dto';
import { LoginRequestDto } from '@/interfaces/dto/login-request-dto';
import { Payload } from '@/interfaces/payload';
import { LoginRequestPayload } from '@/interfaces/payload/login-request-payload';
import { TokenCollection } from '@/interfaces/token-collection';
import { Observable } from 'rxjs';

export abstract class AbstractAuthApiService {
  public abstract postLoginRequest(loginRequestDto: LoginRequestDto): Observable<Payload<LoginRequestPayload>>;

  public abstract postKeyExchange(keyExchangeDto: KeyExchangeDto): Observable<Payload<TokenCollection>>;

  public abstract postKeyRenew(keyRenewDto: KeyRenewDto): Observable<Payload<TokenCollection>>;
}

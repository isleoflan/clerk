import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ApiInterceptor } from './api.interceptor';
import { BaererInterceptor } from './baerer.interceptor';
import { IolAppTokenInterceptor } from './iol-app-token.interceptor';

export const httpInterceptorProviders: Provider = [
  {provide: HTTP_INTERCEPTORS, useClass: IolAppTokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: BaererInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
];

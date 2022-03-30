import { AbstractAuthApiService } from "@/api/abstract-auth-api.service";
import { AuthApiService } from "@/api/auth-api.service";
import { CashierApiService } from "@/api/cashier/cashier-api.service";
import { httpInterceptorProviders } from "@/interceptors";
import { RedirectComponent } from "@/pages/redirect/redirect.component";
import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localCH from '@angular/common/locales/de-CH';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractCashierApiService } from './api/cashier/abstract-cashier-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebUsbService } from "./services/web-usb/web-usb.service";
import { AppStoreModule } from './store/app-store.module';

registerLocaleData(localCH);

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    HttpClientModule,
  ],
  providers: [
    {provide: AbstractCashierApiService, useClass: CashierApiService},
    {provide: AbstractAuthApiService, useClass: AuthApiService},
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'CHF' },
    httpInterceptorProviders,
    WebUsbService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

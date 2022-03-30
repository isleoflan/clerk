import { AbstractAuthApiService } from "@/api/abstract-auth-api.service";
import { AuthApiService } from "@/api/auth-api.service";
import { httpInterceptorProviders } from "@/interceptors";
import { RedirectComponent } from "@/pages/redirect/redirect.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractCashierApiService } from './api/cashier/abstract-cashier-api.service';
import { MockCashierApiService } from './api/cashier/mock-cashier-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebUsbService } from "./services/web-usb/web-usb.service";
import { AppStoreModule } from './store/app-store.module';

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
    {provide: AbstractCashierApiService, useClass: MockCashierApiService},
    {provide: AbstractAuthApiService, useClass: AuthApiService},
    httpInterceptorProviders,
    WebUsbService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

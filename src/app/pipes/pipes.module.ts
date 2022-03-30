import { IntCurrencyPipe } from '@/pipes/int-currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    IntCurrencyPipe
  ],
  exports: [
    IntCurrencyPipe
  ],
  providers: [
    CurrencyPipe,
    IntCurrencyPipe,
  ]
})
export class PipesModule {
}

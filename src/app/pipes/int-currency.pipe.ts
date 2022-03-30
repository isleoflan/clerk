import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intCurrency'
})
export class IntCurrencyPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe
  ) {
  }

  transform(
    value: number | null,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string, locale?: string
  ): string | null {
    if(value === null){
      return this.currencyPipe.transform((0), currencyCode, display, digitsInfo, locale)
    }
    return this.currencyPipe.transform((value / 100), currencyCode, display, digitsInfo, locale);
  }
}

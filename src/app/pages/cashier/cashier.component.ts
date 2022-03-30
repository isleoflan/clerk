import { IntCurrencyPipe } from "@/pipes/int-currency.pipe";
import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import { formatNumber } from "@angular/common";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {

  isPaymentPopupVisible$ = this.userInterfaceFacadeService.isPaymentPopupVisible$;

  constructor(
    private userInterfaceFacadeService: UserInterfaceFacadeService,
    private cartFacadeService: CartFacadeService,
    private webUsbService: WebUsbService,
  ) { }

  ngOnInit(): void {
    this.cartFacadeService.total$.subscribe((total) => {
      console.log(formatNumber(total / 100, 'de-CH', '1.2-2'));
      this.webUsbService.sendMessage(`${'Total:'.padEnd(16, ' ')}${('CHF '+(total / 100).toFixed(2)).padEnd(16, ' ')}`);
    })
  }

}

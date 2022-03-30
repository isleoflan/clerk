import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { CurrencyPipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import {UserInterfaceFacadeService} from '@/store/user-interface/user-interface-facade.service';

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

    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
    this.cartFacadeService.total$.subscribe((total) => {
      this.webUsbService.sendMessage(`${'Total:'.padEnd(16, ' ')}${(this.currencyPipe.transform(total) || '').padEnd(16, ' ')}`);
    })
  }

}

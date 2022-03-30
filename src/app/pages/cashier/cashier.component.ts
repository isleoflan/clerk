import { AbstractCashierApiService } from "@/api/cashier/abstract-cashier-api.service";
import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import { Component, OnInit } from '@angular/core';
import { withLatestFrom } from "rxjs";
import { filter, first } from "rxjs/operators";

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
    private cashierApiService: AbstractCashierApiService
  ) {
  }

  ngOnInit(): void {
    this.cartFacadeService.total$.pipe().subscribe((total) => {
      if (total === 0) {
        this.webUsbService.defaultMessage();
      } else {
        this.webUsbService.sendMessage(`${ 'Total:'.padEnd(16, ' ') }${ ('CHF ' + (total / 100).toFixed(2)).padEnd(16, ' ') }`);
      }
    });

    this.webUsbService.messages$.pipe(
      withLatestFrom(this.userInterfaceFacadeService.isPaymentPopupVisible$),
      filter(([_, isPopupVisible]) => !isPopupVisible)
    ).subscribe(([badgeId]) => {
      this.cashierApiService.getBalance(badgeId).pipe(
        first()
      ).subscribe((payload) => {
        const balance = payload.data.balance;
        this.webUsbService.sendMessage(`${ 'Guthaben:'.padEnd(16, ' ') }${ ('CHF ' + (balance / 100).toFixed(2)).padEnd(16, ' ') }`);
        setTimeout(() => {
          this.cartFacadeService.total$.pipe(first()).subscribe((total) => {
            if (total === 0) {
              this.webUsbService.defaultMessage();
            } else {
              this.webUsbService.sendMessage(`${ 'Total:'.padEnd(16, ' ') }${ ('CHF ' + (total / 100).toFixed(2)).padEnd(16, ' ') }`);
            }
          });
        }, 2000);
      });
    });
  }


}

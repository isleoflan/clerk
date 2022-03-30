import { AbstractCashierApiService } from "@/api/cashier/abstract-cashier-api.service";
import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap, EMPTY, of, take, delay } from "rxjs";
import { first, catchError } from "rxjs/operators";

@Component({
  selector: 'app-pay-popup',
  templateUrl: './pay-popup.component.html',
  styleUrls: ['./pay-popup.component.scss']
})
export class PayPopupComponent implements OnDestroy {

  cart$ = this.cartFacadeService.cart$;
  total$ = this.cartFacadeService.total$;

  private orderProducts$ = this.cartFacadeService.orderProducts$;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userInterfaceFacadeService: UserInterfaceFacadeService,
    private cartFacadeService: CartFacadeService,
    private elementRef: ElementRef,
    private webUsbService: WebUsbService,
    private cashierApiService: AbstractCashierApiService
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onBadgeReady() {
    this.webUsbService.sendMessage('Badge vor leser halten');

    this.webUsbService.messages$.pipe(
      take(1),
      tap((badgeId) => {
        this.webUsbService.sendMessage(`${ 'Guthaben wird'.padEnd(16, ' ') }abgefragt...`);
        console.log('here');
       this.placeOrder(badgeId);
      })
    ).subscribe();
  }

  @HostListener('click', ['$event.target'])
  onClick(target: EventTarget): void {
    if (target === this.elementRef.nativeElement) {
      this.userInterfaceFacadeService.hidePaymentPopup();
    }
  }

  @HostListener('document:keydown.escape')
  onKeypress(): void {
    this.userInterfaceFacadeService.hidePaymentPopup();
  }

  private placeOrder(badgeId: string) {
    this.orderProducts$.pipe(
      first(),
      takeUntil(this.destroyed$)
    ).subscribe((products) => {
      this.cashierApiService.placeOrder({
        badgeId,
        products
      }).pipe(
        first(),
        tap(() => this.cartFacadeService.reset()),
        tap(() => this.userInterfaceFacadeService.hidePaymentPopup()),
        delay(250),
        tap((payload) => {
          this.webUsbService.sendMessage(`${ 'Neues Guthaben:'.padEnd(16, ' ') }${ ('CHF ' + (payload.data.balance / 100).toFixed(2)).padEnd(16, ' ') }`);
          setTimeout(() => {
            this.webUsbService.defaultMessage();
          }, 2000);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return of(EMPTY);
        })
      ).subscribe();
    });
  }
}

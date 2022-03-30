import { AbstractCashierApiService } from "@/api/cashier/abstract-cashier-api.service";
import { OrderDto } from "@/interfaces/dto/order-dto";
import { OrderType } from "@/interfaces/enum/order-type";
import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap, EMPTY, of } from "rxjs";
import { first, catchError } from "rxjs/operators";

@Component({
  selector: 'app-pay-popup',
  templateUrl: './pay-popup.component.html',
  styleUrls: ['./pay-popup.component.scss']
})
export class PayPopupComponent implements OnDestroy{

  cart$ = this.cartFacadeService.cart$;
  total$ = this.cartFacadeService.total$;

  private orderProducts$ = this.cartFacadeService.orderProducts$;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userInterfaceFacadeService: UserInterfaceFacadeService,
    private cartFacadeService: CartFacadeService,
    private elementRef: ElementRef,
    private webUsbService: WebUsbService,
    private cashierApiService: AbstractCashierApiService,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onBadgeReady() {
    this.webUsbService.sendMessage('Badge vor leser halten');

    this.webUsbService.messages$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((badgeId: string) => {
      this.webUsbService.sendMessage(`${'Guthaben wird'.padEnd(16, ' ')}abgefragt...`);
      this.placeOrder(badgeId);
    })
  }

  @HostListener('click', ['$event.target'])
  onClick(target: EventTarget): void {
    if(target === this.elementRef.nativeElement){
      this.userInterfaceFacadeService.hidePaymentPopup();
    }
  }

  @HostListener('document:keydown.escape')
  onKeypress(): void{
    this.userInterfaceFacadeService.hidePaymentPopup();
  }

  private placeOrder(badgeId: string){
    this.orderProducts$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((products) => {
      this.cashierApiService.placeOrder({
        badgeId,
        products
      }).pipe(
        first(),
        tap(() => this.userInterfaceFacadeService.hidePaymentPopup()),
        tap(() => this.cartFacadeService.reset()),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return of(EMPTY);
        })
      ).subscribe();
    });
  }
}

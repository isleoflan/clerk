import { AbstractCashierApiService } from "@/api/cashier/abstract-cashier-api.service";
import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, HostListener, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import {
  Subject,
  takeUntil,
  tap,
  EMPTY,
  of,
  take,
  delay,
  debounceTime,
  withLatestFrom,
} from "rxjs";
import { first, catchError, filter, finalize } from "rxjs/operators";

@Component({
  selector: 'app-pay-popup',
  templateUrl: './pay-popup.component.html',
  styleUrls: ['./pay-popup.component.scss']
})
export class PayPopupComponent implements OnInit, OnDestroy {

  cart$ = this.cartFacadeService.cart$;
  total$ = this.cartFacadeService.total$;

  waitingOnBadge = false;
  balance = 0;
  autoInserted = false;

  topUpForm: FormGroup = new FormGroup({
    amount: new FormControl(0),
  });

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

  ngOnInit() {
    this.balance = 0;
    this.autoInserted = false;

    this.cartFacadeService.topUpId$.pipe(
      takeUntil(this.destroyed$),
      filter((id) => id !== null),
    ).subscribe((id) => {
      this.cartFacadeService.setQty(id!, 0);
    });

    this.topUpForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
      withLatestFrom(this.cartFacadeService.topUpId$),
      filter(([_, id]) => id !== null),
      filter(() => this.topUpForm.valid),
      debounceTime(500)
    ).subscribe(([{amount}, id]) => {
      this.cartFacadeService.setQty(
        id!,
        (amount * 100 || 0));
    });

  }


  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onBadgeReady() {
    this.waitingOnBadge = true;
    this.webUsbService.sendMessage('Badge vor leser halten');

    this.webUsbService.messages$.pipe(
      finalize(() => {
        if(this.waitingOnBadge){
          this.waitingOnBadge = false;
          this.cartFacadeService.total$.pipe(first()).subscribe((total) => {
            if (total === 0) {
              this.webUsbService.defaultMessage();
            } else {
              this.webUsbService.sendMessage(`${ 'Total:'.padEnd(16, ' ') }${ ('CHF ' + (total / 100).toFixed(2)).padEnd(16, ' ') }`);
            }
          });
        }
      }),
      takeUntil(this.destroyed$),
      take(1),
      tap((badgeId) => {
        this.webUsbService.sendMessage(`${ 'Guthaben wird'.padEnd(16, ' ') }abgefragt...`);
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
        finalize(() => this.waitingOnBadge = false),
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
          if(error.status === 402){
            const minTopUp = error.error.data.minTopUp;
            const balance = error.error.data.balance;

            this.topUpForm.setValue({amount: minTopUp / 100});
            this.balance = balance;
            this.autoInserted = true;
            // not enough money please top up
            this.webUsbService.sendMessage(`${ 'Bitte aufladen'.padEnd(16, ' ') }${ ('Min. CHF ' + (minTopUp / 100).toFixed(2)).padEnd(16, ' ') }`);
            setTimeout(() => {
              this.cartFacadeService.total$.pipe(first()).subscribe((total) => {
                if (total === 0) {
                  this.webUsbService.defaultMessage();
                } else {
                  this.webUsbService.sendMessage(`${ 'Total:'.padEnd(16, ' ') }${ ('CHF ' + (total / 100).toFixed(2)).padEnd(16, ' ') }`);
                }
              });
            }, 2000);
          }
          return of(EMPTY);
        })
      ).subscribe();
    });
  }
}

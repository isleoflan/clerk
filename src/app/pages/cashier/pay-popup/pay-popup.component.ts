import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pay-popup',
  templateUrl: './pay-popup.component.html',
  styleUrls: ['./pay-popup.component.scss']
})
export class PayPopupComponent {

  cart$ = this.cartFacadeService.cart$;
  total$ = this.cartFacadeService.total$;

  constructor(
    private userInterfaceFacadeService: UserInterfaceFacadeService,
    private cartFacadeService: CartFacadeService,
    private elementRef: ElementRef
  ) { }

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

}

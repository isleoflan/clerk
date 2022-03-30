import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { UserInterfaceFacadeService } from "@/store/user-interface/user-interface-facade.service";
import {Component, HostListener} from '@angular/core';

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
    private cartFacadeService: CartFacadeService
  ) { }

  @HostListener('document:keydown.escape')
  onKeypress(): void{
    this.userInterfaceFacadeService.hidePaymentPopup();
  }

}

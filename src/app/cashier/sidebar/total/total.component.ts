import { Component } from '@angular/core';
import {CartFacadeService} from '../../../store/cart/cart-facade.service';
import {UserInterfaceFacadeService} from '../../../store/user-interface/user-interface-facade.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent {

  total$ = this.cartFacadeService.total$;

  constructor(
    private cartFacadeService: CartFacadeService,
    private userInterfaceFacadeService: UserInterfaceFacadeService

  ) { }

  onClick(): void{
    this.userInterfaceFacadeService.showPaymentPopup();
  }

}

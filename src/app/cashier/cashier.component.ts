import { Component, OnInit } from '@angular/core';
import {UserInterfaceFacadeService} from '../store/user-interface/user-interface-facade.service';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {

  isPaymentPopupVisible$ = this.userInterfaceFacadeService.isPaymentPopupVisible$;

  constructor(
    private userInterfaceFacadeService: UserInterfaceFacadeService
  ) { }

  ngOnInit(): void {
  }

}

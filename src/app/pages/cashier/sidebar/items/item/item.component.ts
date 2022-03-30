import { SidebarItem } from "@/interfaces/shared/sidebar-item";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: SidebarItem | null = null;

  constructor(
    private cartFacadeService: CartFacadeService
  ) { }

  ngOnInit(): void {
  }

  increase(id: string): void{
    this.cartFacadeService.increaseQty(id)
  }
  decrease(id: string): void{
    this.cartFacadeService.decreaseQty(id)
  }
}

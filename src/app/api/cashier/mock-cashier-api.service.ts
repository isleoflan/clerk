import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {OrderDto} from '../../interfaces/dto/order-dto';
import {TopUpDto} from '../../interfaces/dto/top-up-dto';
import {Payload} from '../../interfaces/payload';
import {Badge} from '../../interfaces/payload/badge';
import {OrderResponse} from '../../interfaces/payload/order-response';
import {Product} from '../../interfaces/payload/product';
import {AbstractCashierApiService} from './abstract-cashier-api.service';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class MockCashierApiService implements AbstractCashierApiService{

  private products: Product[] = MockCashierApiService.createProducts();
  private badge: Badge = MockCashierApiService.createBadge();

  constructor() {
    faker.setLocale('de_CH');
  }

  private static createProducts(numberOfProducts: number = 20): Product[] {
    const products = [];
    for (let i = 0; i < numberOfProducts; i++){
      const product: Product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(50, 10000))
      }
      products.push(product);
    }
    return products;
  }

  private static createBadge(): Badge {
    return {
      id: faker.datatype.number(),
      balance: 10000
    }
  }

  getBadge(id: string): Observable<Payload<Badge>> {
    return of({
      data: this.badge
    }).pipe(delay(50));
  }

  getProducts(): Observable<Payload<Product[]>> {
    return of({data: this.products}).pipe(delay(50));
  }


  placeOrder(oderDto: OrderDto): Observable<Payload<OrderResponse>> {
    return of({
      data: {
        balance: parseInt(faker.commerce.price(50, 10000))
      }
    }).pipe(delay(50));
  }

  topUpBadge(topUpDto: TopUpDto): Observable<Payload<OrderResponse>> {
    this.badge.balance += topUpDto.topUp;
    return of({
      data: {
        balance: this.badge.balance
      }
    }).pipe(delay(50));
  }
}

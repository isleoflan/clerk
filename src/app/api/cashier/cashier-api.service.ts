import { AbstractCashierApiService } from "@/api/cashier/abstract-cashier-api.service";
import { OrderDto } from "@/interfaces/dto/order-dto";
import { TopUpDto } from "@/interfaces/dto/top-up-dto";
import { Payload } from "@/interfaces/payload";
import { Balance } from "@/interfaces/payload/balance";
import { OrderResponse } from "@/interfaces/payload/order-response";
import { Product } from "@/interfaces/payload/product";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, first } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CashierApiService implements AbstractCashierApiService{

  constructor(
    private http: HttpClient
  ) {}

  getBalance(badgeId: string): Observable<Payload<Balance>> {
    return this.http.get<Payload<Balance>>('/balance', { params: { badgeId}}).pipe(first());
  }

  getProducts(): Observable<Payload<Product[]>> {
    return this.http.get<Payload<Product[]>>('/products').pipe(first());
  }

  placeOrder(orderDto: OrderDto): Observable<Payload<OrderResponse>> {
    return this.http.post<Payload<OrderResponse>>('/order', {...orderDto}).pipe(first());
  }
}

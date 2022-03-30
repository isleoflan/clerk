import {Observable} from 'rxjs';
import {OrderDto} from '@/interfaces/dto/order-dto';
import {TopUpDto} from '@/interfaces/dto/top-up-dto';
import {Payload} from '@/interfaces/payload';
import {Balance} from '@/interfaces/payload/balance';
import {OrderResponse} from '@/interfaces/payload/order-response';
import {Product} from '@/interfaces/payload/product';


export abstract class AbstractCashierApiService {
  public abstract getProducts(): Observable<Payload<Product[]>>;
  public abstract getBalance(id: string): Observable<Payload<Balance>>;

  public abstract placeOrder(oderDto: OrderDto): Observable<Payload<OrderResponse>>;

  public abstract topUpBadge(topUpDto: TopUpDto): Observable<Payload<OrderResponse>>;
}

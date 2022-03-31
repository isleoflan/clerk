import {Observable} from 'rxjs';
import {OrderDto} from '@/interfaces/dto/order-dto';
import {Payload} from '@/interfaces/payload';
import {Balance} from '@/interfaces/payload/balance';
import {OrderResponse} from '@/interfaces/payload/order-response';
import {Product} from '@/interfaces/payload/product';


export abstract class AbstractCashierApiService {
  public abstract getProducts(): Observable<Payload<{products:Product[], topUp: string}>>;
  public abstract getBalance(badgeId: string): Observable<Payload<Balance>>;

  public abstract placeOrder(orderDto: OrderDto): Observable<Payload<OrderResponse>>;
}

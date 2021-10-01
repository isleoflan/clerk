import {Observable} from 'rxjs';
import {OrderDto} from '../../interfaces/dto/order-dto';
import {Payload} from '../../interfaces/payload';
import {Badge} from '../../interfaces/payload/badge';
import {OrderResponse} from '../../interfaces/payload/order-response';
import {Product} from '../../interfaces/payload/product';


export abstract class AbstractCashierApiService {
  public abstract getProducts(): Observable<Payload<Product[]>>;
  public abstract getBadge(id: number): Observable<Payload<Badge[]>>;

  public abstract placeOrder(oderDto: OrderDto): Observable<Payload<OrderResponse>>;

  public abstract topUpBadge(): Observable<Payload<OrderResponse>>;
}

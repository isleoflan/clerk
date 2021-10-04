import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {AbstractCashierApiService} from '../../api/cashier/abstract-cashier-api.service';
import {MockCashierApiService} from '../../api/cashier/mock-cashier-api.service';
import {ProductStoreReducer} from '../../store/product';
import {ProductComponent} from './product/product.component';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent],
      imports: [
        StoreModule.forRoot({
          product: ProductStoreReducer.reducer
        })
      ],
      providers: [
        {provide: AbstractCashierApiService, provideClass: MockCashierApiService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

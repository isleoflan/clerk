import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {AbstractCashierApiService} from '../api/cashier/abstract-cashier-api.service';
import {MockCashierApiService} from '../api/cashier/mock-cashier-api.service';

import { CashierComponent } from './cashier.component';
import {PayPopupModule} from './pay-popup/pay-popup.module';
import {ProductsModule} from './products/products.module';
import {SidebarModule} from './sidebar/sidebar.module';

describe('CashierComponent', () => {
  let component: CashierComponent;
  let fixture: ComponentFixture<CashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CashierComponent
      ],
      imports: [
        ProductsModule,
        SidebarModule,
        PayPopupModule,
        StoreModule.forRoot({})
      ],
      providers: [
        {provide: AbstractCashierApiService, provideClass: MockCashierApiService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

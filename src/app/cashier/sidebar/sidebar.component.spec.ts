import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ItemComponent} from './items/item/item.component';
import {ItemsComponent} from './items/items.component';

import { SidebarComponent } from './sidebar.component';
import {TotalComponent} from './total/total.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        ItemsComponent,
        TotalComponent,
        ItemComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

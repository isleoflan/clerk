import { SidebarItem } from "@/interfaces/shared/sidebar-item";
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss']
})
export class TableItemComponent {

  @Input() item: SidebarItem | null = null
  constructor() { }

}

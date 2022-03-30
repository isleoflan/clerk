import { WebUsbService } from "@/services/web-usb/web-usb.service";
import { Component } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-terminal-connection',
  templateUrl: './terminal-connection.component.html',
  styleUrls: ['./terminal-connection.component.scss']
})
export class TerminalConnectionComponent{

  isConnected$: BehaviorSubject<boolean> = this.webUsbService.isConnected$;

  constructor(
    private webUsbService: WebUsbService
  ) { }

  onSelectDevice(): void {
    this.webUsbService.requestPort();
  }
}

import { Component } from '@angular/core';
import { WebUsbService } from "./services/web-usb/web-usb.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private webUsbService: WebUsbService
  ) {
  }

  selectDevice(){
    this.webUsbService.requestPort();
  }

  sendMessage(){
    this.webUsbService.sendMessage('Hello World');
  }
}

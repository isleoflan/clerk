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

    // @ts-ignore
   // usb.getDevices().then((devices) => console.log(devices));
  }

  selectDevice(){
    this.webUsbService.requestPort();
  }
/*
  selectDevice() {
    // @ts-ignore
    if (navigator.usb) {
      this.handleUSB();
    } else {
      console.error("WebUSB not enabled (chrome://flags/#new-usb-backend)");
    }
  }


  async handleUSB() {
    // @ts-ignore
    const usb = navigator.usb;

    // @ts-ignore


    const device = await usb.requestDevice({
      filters: [
        {'vendorId': 0x2341, 'productId': 0x8036}, // Arduino Leonardo
        {'vendorId': 0x2341, 'productId': 0x8037}, // Arduino Micro
        {'vendorId': 0x2341, 'productId': 0x804d}, // Arduino/Genuino Zero
        {'vendorId': 0x2341, 'productId': 0x804e}, // Arduino/Genuino MKR1000
        {'vendorId': 0x2341, 'productId': 0x804f}, // Arduino MKRZERO
        {'vendorId': 0x2341, 'productId': 0x8050}, // Arduino MKR FOX 1200
        {'vendorId': 0x2341, 'productId': 0x8052}, // Arduino MKR GSM 1400
        {'vendorId': 0x2341, 'productId': 0x8053}, // Arduino MKR WAN 1300
        {'vendorId': 0x2341, 'productId': 0x8054}, // Arduino MKR WiFi 1010
        {'vendorId': 0x2341, 'productId': 0x8055}, // Arduino MKR NB 1500
        {'vendorId': 0x2341, 'productId': 0x8056}, // Arduino MKR Vidor 4000
        {'vendorId': 0x2341, 'productId': 0x8057}, // Arduino NANO 33 IoT
        {'vendorId': 0x239A} // Adafruit Boards!
      ]
    });

    // const devices = await usb.getDevices(); Only show devices that the page is allowed to use [requestDevice(...)]

    console.log('device', device);
    await device.open();
    if(device.conficuration === null){
      await device.selectConfiguration(1);
    }

    await device.claimInterface(2);
    await device.selectAlternateInterface(2, 0);

    await device.controlTransferOut({
      'requestType': 'class',
      'recipient': 'interface',
      'request': 0x22,
      'value': 0x01,
      'index': 2,
    });

    console.log('out', await device.transferOut(4, new TextEncoder().encode('H')));

    const result = await device.transferIn(5, 64);

    console.log('result', result);

    const intData = new TextDecoder().decode(result.data);

    console.log('int', intData);

    await device.releaseInterface(1);
    await device.close();
  }
*/
}

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{


  constructor(
   // private webUsbService: WebUsbService
  ) {
  }

  selectDevice() {


    // @ts-ignore
    if(navigator.usb){
      this.handleUSB();
    } else {
      console.error("WebUSB not enabled (chrome://flags/#new-usb-backend)");
    }
  }


  async handleUSB() {
    // @ts-ignore
    const usb = navigator.usb;

    const device = await usb.requestDevice({ filters: [{
        // vendorId: 0x045E, // Microsoft
        // productId: 0x028E // XBox 360 Controller
      }]});

    // const devices = await usb.getDevices(); Only show devices that the page is allowed to use [requestDevice(...)]

    console.log(device);
    await device.open();
    await device.selectConfiguration(1);

    await device.claimInterface(2);

    console.log(await device.transferOut(4, new TextEncoder().encode('H')));

    const result = await device.transferIn(5, 64);

    console.log(result);

    const intData = new TextDecoder().decode(result.data);

    console.log(intData)

    await device.releaseInterface(1);
    await device.close();
  }

}

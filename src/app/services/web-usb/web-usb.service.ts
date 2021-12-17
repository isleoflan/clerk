import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

/*
interface Navigator {
  usb: {
    getDevices(): any,
    requestDevice(args: Object): any,
    addEventListener(name: string, args: Object): any
  }
}
*/


@Injectable({
  providedIn: 'root'
})
export class WebUsbService {

  // private device;
  public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  // console.log(navigator.usb);
  }
}

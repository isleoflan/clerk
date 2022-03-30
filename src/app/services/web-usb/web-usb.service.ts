import { Device } from "@/services/web-usb/Device";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class WebUsbService {

  messages$: Subject<string> = new Subject<string>();
  isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private connectedDevices$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([]);
  private selectedDevice$: BehaviorSubject<Device | null> = new BehaviorSubject<Device  | null>(null);

  private usb = navigator.usb;

  private filters = [
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
  ];


  constructor() {
    this.connect();

    this.usb.addEventListener('disconnect', () => {
      this.isConnected$.next(false);
    });

    this.usb.addEventListener('connect', () => {
      this.connect();
    });
  }


  public async connect(){
    await this.usb.getDevices().then((usbDevices: USBDevice[]) => {
      const devices = usbDevices.map((device) => new Device(device));

      this.connectedDevices$.next(devices);
      this.selectedDevice$.next(devices[0]);
    });

    const selectedDevice = this.selectedDevice$.getValue();

    selectedDevice?.receive$.subscribe((data) => {
      this.messages$.next(data);
    });

    await selectedDevice?.connect().then(() => {
      this.defaultMessage();
      this.isConnected$.next(true);
    })
  }

  public sendMessage(message: string){
    this.selectedDevice$.getValue()?.send(message);
  }

  public defaultMessage() {
    this.sendMessage(`${'Wilkommen an der'.padEnd(16, ' ')}IOL 2022`);
  }

  public requestPort() {
    this.usb.requestDevice({filters: this.filters}).then((device: USBDevice) => {
      this.selectedDevice$.next(new Device(device));
      this.connect()
    }).catch(() => {
      console.log('canceled Device Selection');
    });
  }
}

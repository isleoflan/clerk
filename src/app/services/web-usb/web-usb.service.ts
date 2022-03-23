import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";


export class Device {
  public device: USBDevice;
  public interfaceNumber: number | null = null;
  public endpointIn: number | null = null;
  public endpointOut: number | null = null;


  public receive$: Subject<USBInTransferResult> = new Subject<USBInTransferResult>();

  // @ts-ignore;
  private usb: Navigator.usb;

  constructor(device: USBDevice) {
    this.device = device;

    // @ts-ignore;
    this.usb = navigator.usb;
  }

  public connect() {

    const readLoop = () => {
      console.log('transferIn wait');
      this.device.transferIn(this.endpointIn!, 64).then((result: USBInTransferResult) => {
        this.onReceive(result);
        readLoop();
      }).catch((error) => {
        console.log(error);
      })
    }

    return this.device.open()
      .then(() => {
        if (this.device.configuration === null) {
          this.device.selectConfiguration(1);
        }
      })
      .then(() => {
        var configurationInterfaces = this.device.configuration!.interfaces;
        configurationInterfaces.forEach((element) => {
          element.alternates.forEach((alternateInterface) => {
            if (alternateInterface.interfaceClass == 0xff) {
              this.interfaceNumber = element.interfaceNumber;
              alternateInterface.endpoints.forEach((alternateEndpoint) => {
                switch (alternateEndpoint.direction) {
                  case "out":
                    this.endpointOut = alternateEndpoint.endpointNumber;
                    break;
                  case "in":
                    this.endpointIn = alternateEndpoint.endpointNumber;
                    break;
                  // no default;
                }
              });
            }
          });
        });
      })
      .then(() => this.device.claimInterface(this.interfaceNumber!))
      .then(() => this.device.selectAlternateInterface(this.interfaceNumber!, 0))
      .then(() => this.device.controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: 0x22,
        value: 0x01,
        index: this.interfaceNumber!
      }))
      .then(() => {
        readLoop();
      });
  }

  public disconnect() {
    return this.device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: 0x22,
      value: 0x01,
      index: this.interfaceNumber!
    })
      .then(() => {
        this.device.close();
      })
  }

  public send(data: Uint8Array){
    return this.device.transferOut(this.endpointOut!, data);
  }

  private onReceive(result: USBInTransferResult): void{
    console.log(result);
    this.receive$.next(result);
  }

  private onReceiveError(error: any): void{
    console.error(error);
  }
}


@Injectable({
  providedIn: 'root'
})
export class WebUsbService {

  private connectedDevices$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([]);
  private selectedDevice$: BehaviorSubject<Device | null> = new BehaviorSubject<Device  | null>(null);

  // public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // @ts-ignore
  private usb = navigator.usb;

  private textDecoder = new TextDecoder();
  private textEncoder = new TextEncoder();


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
   // setInterval(() => {
      this.connect()
    // }, 5000);
  }


  public async connect(){
    await this.usb.getDevices().then((usbDevices: USBDevice[]) => {
      const devices = usbDevices.map((device) => new Device(device));

      this.connectedDevices$.next(devices);
      this.selectedDevice$.next(devices[0]);
    });

    const selectedDevice = this.selectedDevice$.getValue();

    selectedDevice?.receive$.subscribe((data) => {
      console.log(this.textDecoder.decode(data.data))
    });



    selectedDevice?.connect().then(() => {
      console.log(selectedDevice);
      const message = `${'Total:'.padEnd(16, ' ')}${'CHF 50.00'.padEnd(16, ' ')}`;
      console.log(message);

      selectedDevice?.send(this.textEncoder.encode(message));
      console.log(selectedDevice);
      //selectedDevice?.send(this.textEncoder.encode('H'));
      //selectedDevice?.send(this.textEncoder.encode('H'));
      //selectedDevice?.send(this.textEncoder.encode('H'));
    });

  }

  public requestPort() {
    this.usb.requestDevice({filters: this.filters}).then((device: USBDevice) => {
      this.selectedDevice$.next(new Device(device));
      this.connect();
    }).catch(() => {
      console.log('canceled Device Selection');
    });
  }
}

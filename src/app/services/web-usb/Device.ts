import { Subject } from "rxjs";

export class Device {
  public device: USBDevice;
  public interfaceNumber: number | null = null;
  public endpointIn: number | null = null;
  public endpointOut: number | null = null;


  public receive$: Subject<string> = new Subject<string>();

  // @ts-ignore;
  private usb: Navigator.usb;

  private textEncoder: TextEncoder = new TextEncoder();
  private textDecoder: TextDecoder = new TextDecoder();

  constructor(device: USBDevice) {
    this.device = device;

    // @ts-ignore;
    this.usb = navigator.usb;
  }

  public connect() {

    const readLoop = () => {
      this.device.transferIn(this.endpointIn!, 64).then((result: USBInTransferResult) => {
        this.onReceive(result);
        readLoop();
      }).catch((error) => {
        Device.onReceiveError(error);
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

  public send(data: string){
    return this.device.transferOut(this.endpointOut!, this.textEncoder.encode(data));
  }

  private onReceive(result: USBInTransferResult): void{
    this.receive$.next(this.textDecoder.decode(result.data));
  }

  private static onReceiveError(error: any): void{
    console.error(error);
  }
}

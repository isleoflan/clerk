// @ts-nocheck

export interface ControlTransferSetupInterface {
  requestType: 'standard' | 'class' |'vendor';
  recipient: 'device' | 'interface' | 'endpoint' | 'other';
  request: any;
  value: any;
  index: number;
}


export class usb {
  getDevices(): Promise<USBDevice[]>;

  requestDevice(args: { filters?: Array<{ vendorId: number, productId: number }> }): Promise<USBDevice[]>;

  addEventListener(name: string, args: Object): void;
}


export class USBConfiguration {
  readonly configurationValue;
  readonly configurationName;
  readonly interfaces: USBInterface[];
}

export class USBInterface {
  readonly interfaceNumber: number;
  readonly alternate: USBAlternateInterface;
  readonly alternates: USBAlternateInterface[];
  readonly claimed: boolean;

  constructor();

}

export class USBAlternateInterface {

  readonly alternateSetting: number;
  readonly interfaceClass: number;
  readonly interfaceSubclass;
  readonly interfaceProtocol;
  readonly interfaceName: string;
  readonly endpoints: USBEndpoint[];

  constructor();
}

export class USBEndpoint {
  readonly endpointNumber: number;
  readonly direction: 'in' | 'out';
  readonly type: 'bulk' | 'interrupt' | 'isochronous';
  readonly packetSize: number;

  constructor();
}


export class USBDevice {
  readonly configuration: USBConfiguration | null;
  readonly configurations: USBConfiguration[];
  readonly deviceClass;
  readonly deviceProtocol: string;
  readonly deviceSubclass: string;
  readonly deviceVersionMajor: string;
  readonly deviceVersionMinor: string;
  readonly deviceVersionSubminor: string;
  readonly manufacturerName: string;
  readonly opened: boolean;
  readonly productId: string;
  readonly productName: string;
  readonly serialNumber: string;
  readonly usbVersionMajor: string;
  readonly usbVersionMinor: string;
  readonly usbVersionSubminor: string;
  readonly vendorId: string;

  public claimInterface(interfaceNumber: number): Promise<any>;

  public clearHalt(): Promise<any>;

  public controlTransferIn(): Promise<any>;

  public controlTransferOut(setup: ControlTransferSetupInterface, data?: Uint8Array): Promise<any>;

  public close(): Promise<any>;

  public isochronousTransferIn(): Promise<any>;

  public isochronousTransferOut(): Promise<any>;

  public open(): Promise<any>;

  public releaseInterface(): Promise<any>;

  public reset(): Promise<any>;

  public selectAlternateInterface(interfaceNumber: number, alternateSetting: number): Promise<any>;

  public selectConfiguration(configurationNumber: number): Promise<any>;

  public transferIn(endpointNumber: number, length: number): Promise<any>;

  public transferOut(endpointNumber: number, data: Uint8Array): Promise<any>;
}

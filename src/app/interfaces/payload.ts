export interface Payload<T> {
  data: T;
  errors?: ErrorPayload[];
  rId?: string;
  v?: string;
}

export interface ErrorPayload {
  errorCode: number;
  message: string;
}

import { Beneficiarie } from "./beneficiarie.model";
import { Customer } from "./customer.model";

export class Holder {
  id?: number;
  customer_id: number;
  status: number;
  customer?: Customer;
  beneficiaries?: Beneficiarie[];
  // chatRooms?: ChatRoom[]
}

export interface ResponseHolder {
  message: string;
  data: Holder[];
}

export interface ResponseOneHolder {
  message: string;
  data: Holder;
}

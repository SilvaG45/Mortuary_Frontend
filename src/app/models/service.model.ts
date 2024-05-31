import { Customer } from "./customer.model";

export class Service {
  id?: number;
  ceremony_id?: number;
  //   ceremony?: Ceremony;
  body_ubication: string;
  need_trip: boolean;
  status: number;
  customers: Customer[];
}

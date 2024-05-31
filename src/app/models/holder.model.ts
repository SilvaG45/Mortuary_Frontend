import { Customer } from "./customer.model";

export class Holder {
  id?: number;
  customer_id?: number;
  customer?: Customer;
  status: number;
  holders?: Holder[];
}

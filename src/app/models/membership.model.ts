import { Customer } from "./customer.model";
import { Plan } from "./plan.model";

export class Membership {
  id?: number;
  name: string;
  plan_id?: number;
  plan?: Plan;
  customer_id?: number;
  customer?: Customer;
  status?: number;
}

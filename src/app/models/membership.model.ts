import { Customer } from "./customer.model";
import { Plan } from "./plan.model";

export class Membership {
  id?: number;
  name: string;
  customer_id?: number;
  customer?: Customer;
  plan_id?: number;
  plan?: Plan;
  status?: number;
}

export interface ResponseMembership {
  message: string;
  data: Membership[];
}

export interface ResponseOneMembership {
  message: string;
  data: Membership;
}

import { Customer } from "./customer.model";
import { Service } from "./service.model";

export class Plan {
  id?: number;
  name: string;
  description: string;
  number_of_beneficiaries: number;
  price: number;
  discount: number;
  customers?: Customer[];
  services?: Service[];
}

export interface ResponsePlan {
  message: string;
  data: Plan[];
}

export interface ResponseOnePlan {
  message: string;
  data: Plan;
}

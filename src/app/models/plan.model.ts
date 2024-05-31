import { Customer } from "./customer.model";

export class Plan {
  id?: number;
  name: string;
  description: string;
  number_of_beneficiaries: number;
  price: number;
  discount: number;
  customers?: Customer[];
}

export interface ResponsePlan {
  message: string;
  data: Plan[];
}

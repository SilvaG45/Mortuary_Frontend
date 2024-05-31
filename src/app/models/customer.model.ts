import { Beneficiarie } from "./beneficiarie.model";
import { Holder } from "./holder.model";
import { Plan } from "./plan.model";
import { Service } from "./service.model";

export class Customer {
  id?: number;
  user_id: string;
  status: number;
  holders?: Holder[];
  beneficiaries?: Beneficiarie[];
  plans?: Plan[];
  services?: Service[];
}

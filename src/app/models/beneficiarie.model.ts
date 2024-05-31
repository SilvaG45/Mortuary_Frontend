import { Customer } from "./customer.model";
import { Holder } from "./holder.model";

export class Beneficiarie {
  id?: number;
  customer_id: number;
  customer?: Customer;
  holder_id: number;
  holder?: Holder;
  isprincipal_beneficiarie: boolean;
  is_emergy_contact: boolean;
  status: number;
}
export interface ResponeBeneficiarie {
  message: string;
  data: Beneficiarie[];
}
export interface ResponeOneBeneficiarie {
  message: string;
  data: Beneficiarie;
}

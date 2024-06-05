import { Customer } from "./customer.model";
import { ServiceExecution } from "./service-execution.model";

export class Service {
  id?: number;
  body_ubication: string;
  need_trip: boolean;
  status: number;
  // cremations?: Cremation[]
  // burials?: Burial[]
  // relocations?: Relocation[]
  serviceExecutions?: ServiceExecution[];
}

export interface ResponseService {
  message: string;
  data: Service[];
}
export interface ResponseOneService {
  message: string;
  data: Service;
}

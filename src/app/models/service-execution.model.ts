import { Customer } from "./customer.model";
import { Service } from "./service.model";

export class ServiceExecution {
  id?: number;
  service_id: number;
  service?: Service;
  customer_id: number;
  customer?: Customer;
  driver_id: number;
  //   driver?: Driver;
  room_id: number;
  //   room?: Room;
  main_office: string;
  location: string;
  status: number;
}
export interface ResponeServiceExecution {
  data: {
    data: ServiceExecution[];
  };
  message: string;
}
export interface ResponeOneServiceExecution {
  message: string;
  data: ServiceExecution;
}

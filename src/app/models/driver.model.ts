export class Driver {
  id: number;
  user_id: string;
  name: string;
  vehicle: string;
  model: string;
  phone_number: string;
  capacity: number;
  status: number;
}

export interface ResponseDriver {
  data: {
    data: Driver[];
  };
  message: string;
}

export interface ResponseOneDriver {
  message: string;
  data: Driver;
}

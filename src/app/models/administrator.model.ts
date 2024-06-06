export class Administrator {
  id: number;
  user_id: string;
  responsabilities: string;
  status: number;
  // headquarter_id: number;
}

export interface ResponseAdministrator {
  data: {
    data: Administrator[];
  };
  message: string;
}

export interface ResponseOneAdministrator {
  message: string;
  data: Administrator;
}

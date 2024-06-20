import { User } from "./user.model";

export interface AuthResponse {
    token?: string;
    user?: User;
    // otros campos que se devuelven en la respuesta
  }
  
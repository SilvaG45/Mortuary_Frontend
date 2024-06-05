import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Customer,
  ResponseCustomer,
  ResponseOneCustomer,
} from "../models/customer.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseCustomer> {
    return this.http.get<ResponseCustomer>(
      `${environment.url_ms_cinema}/Customers`
    );
  }
  view(id: number): Observable<ResponseOneCustomer> {
    return this.http.get<ResponseOneCustomer>(
      `${environment.url_ms_cinema}/Customers/${id}`
    );
  }
  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.url_ms_cinema}/Customers/`,
      customer
    );
  }
  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.url_ms_cinema}/Customers/${customer.id}`,
      customer
    );
  }
  delete(id: number) {
    return this.http.delete<Customer>(
      `${environment.url_ms_cinema}/Customers/${id}`
    );
  }
}

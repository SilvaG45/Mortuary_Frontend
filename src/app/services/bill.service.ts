import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bill } from "../models/bill.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BillService {
  constructor(private http: HttpClient) {}
  list(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${environment.url_ms_mortuary}/bills`);
  }
  delete(id: number) {
    return this.http.delete<Bill>(`${environment.url_ms_mortuary}/bills/${id}`);
  }
}

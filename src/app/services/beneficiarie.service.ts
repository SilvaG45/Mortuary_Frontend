import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Beneficiarie,
  ResponeBeneficiarie,
  ResponeOneBeneficiarie,
} from "../models/beneficiarie.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BeneficiarieService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponeBeneficiarie> {
    return this.http.get<ResponeBeneficiarie>(
      `${environment.url_ms_cinema}/Beneficiaries`
    );
  }
  view(id: number): Observable<ResponeOneBeneficiarie> {
    return this.http.get<ResponeOneBeneficiarie>(
      `${environment.url_ms_cinema}/Beneficiaries/${id}`
    );
  }
  create(theBeneficiarie: Beneficiarie): Observable<ResponeOneBeneficiarie> {
    return this.http.post<ResponeOneBeneficiarie>(
      `${environment.url_ms_cinema}/Beneficiaries/`,
      theBeneficiarie
    );
  }
  update(theBeneficiarie: Beneficiarie): Observable<ResponeOneBeneficiarie> {
    return this.http.put<ResponeOneBeneficiarie>(
      `${environment.url_ms_cinema}/Beneficiaries/${theBeneficiarie.id}`,
      theBeneficiarie
    );
  }
  delete(id: number) {
    return this.http.delete<Beneficiarie>(
      `${environment.url_ms_cinema}/Beneficiaries/${id}`
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Administrator,
  ResponseAdministrator,
  ResponseOneAdministrator,
} from "../models/administrator.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdministratorService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseAdministrator> {
    return this.http.get<ResponseAdministrator>(
      `${environment.url_ms_mortuary}/Administrators`
    );
  }
  view(id: number): Observable<ResponseOneAdministrator> {
    return this.http.get<ResponseOneAdministrator>(
      `${environment.url_ms_mortuary}/Administrators/${id}`
    );
  }
  create(administrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(
      `${environment.url_ms_mortuary}/Administrators/`,
      administrator
    );
  }
  update(administrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(
      `${environment.url_ms_mortuary}/Administrators/${administrator.id}`,
      administrator
    );
  }
  delete(id: number) {
    return this.http.delete<Administrator>(
      `${environment.url_ms_mortuary}/Administrators/${id}`
    );
  }
}

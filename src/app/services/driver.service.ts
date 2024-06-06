import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  Driver,
  ResponseDriver,
  ResponseOneDriver,
} from "../models/driver.model";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseDriver> {
    return this.http.get<ResponseDriver>(
      `${environment.url_ms_mortuary}/Drivers`
    );
  }
  view(id: number): Observable<ResponseOneDriver> {
    return this.http.get<ResponseOneDriver>(
      `${environment.url_ms_mortuary}/Drivers/${id}`
    );
  }
  create(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(
      `${environment.url_ms_mortuary}/Drivers/`,
      driver
    );
  }
  update(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(
      `${environment.url_ms_mortuary}/Drivers/${driver.id}`,
      driver
    );
  }
  delete(id: number) {
    return this.http.delete<Driver>(
      `${environment.url_ms_mortuary}/Drivers/${id}`
    );
  }
}

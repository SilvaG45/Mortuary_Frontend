import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { City } from "../models/city.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CityService {
  constructor(private http: HttpClient) {}
  list(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.url_ms_mortuary}/cities`);
  }
  delete(id: number) {
    return this.http.delete<City>(`${environment.url_ms_mortuary}/cities/${id}`);
  }
}

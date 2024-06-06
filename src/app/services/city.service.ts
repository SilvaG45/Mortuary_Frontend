import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { City } from "../models/city.model";

@Injectable({
  providedIn: "root",
})
export class CityService {
  constructor(private http: HttpClient) {}

  list(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.url_ms_mortuary}/Cities`);
  }
  view(id: number): Observable<City> {
    return this.http.get<City>(`${environment.url_ms_mortuary}/Cities/${id}`);
  }
  create(theCity: City): Observable<City> {
    return this.http.post<City>(
      `${environment.url_ms_mortuary}/Cities/`,
      theCity
    );
  }
  update(theCity: City): Observable<City> {
    return this.http.put<City>(
      `${environment.url_ms_mortuary}/Cities/${theCity.id}`,
      theCity
    );
  }
  delete(id: number) {
    return this.http.delete<City>(
      `${environment.url_ms_mortuary}/Cities/${id}`
    );
  }
}

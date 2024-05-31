import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Driver } from "../models/driver.model";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  constructor(private http: HttpClient) {}

  list(): Observable<Driver []> {
    return this.http.get<Driver []>(`${environment.url_ms_mortuary}/Driver s`);
  }
  view(id: number): Observable<Driver > {
    return this.http.get<Driver >(
      `${environment.url_ms_mortuary}/admnistrators/${id}`
    );
  }
  create(theDriver : Driver ): Observable<Driver > {
    return this.http.post<Driver >(
      `${environment.url_ms_mortuary}/admnistrators/`,
      theDriver 
    );
  }
  update(theDriver : Driver ): Observable<Driver > {
    return this.http.put<Driver >(
      `${environment.url_ms_mortuary}/admnistrators/${theDriver .id}`,
      theDriver 
    );
  }
  delete(id: number) {
    return this.http.delete<Driver >(
      `${environment.url_ms_mortuary}/admnistrators/${id}`
    );
  }
}

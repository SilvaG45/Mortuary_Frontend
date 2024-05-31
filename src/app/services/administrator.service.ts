import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Administrator } from "../models/administrator.model";

@Injectable({
  providedIn: "root",
})
export class AdministratorService {
  constructor(private http: HttpClient) {}

  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${environment.url_ms_mortuary}/administrators`);
  }
  view(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(
      `${environment.url_ms_mortuary}/admnistrators/${id}`
    );
  }
  create(theAdministrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(
      `${environment.url_ms_mortuary}/admnistrators/`,
      theAdministrator
    );
  }
  update(theAdministrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(
      `${environment.url_ms_mortuary}/admnistrators/${theAdministrator.id}`,
      theAdministrator
    );
  }
  delete(id: number) {
    return this.http.delete<Administrator>(
      `${environment.url_ms_mortuary}/admnistrators/${id}`
    );
  }
}

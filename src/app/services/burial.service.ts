import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Burial } from "../models/burial.model";

@Injectable({
  providedIn: "root",
})
export class BurialService {
  constructor(private http: HttpClient) {}

  list(): Observable<Burial[]> {
    return this.http.get<Burial[]>(`${environment.url_ms_mortuary}/Burials`);
  }
  view(id: number): Observable<Burial> {
    return this.http.get<Burial>(
      `${environment.url_ms_mortuary}/Burials/${id}`
    );
  }
  create(theBurial: Burial): Observable<Burial> {
    return this.http.post<Burial>(
      `${environment.url_ms_mortuary}/Burials/`,
      theBurial
    );
  }
  update(theBurial: Burial): Observable<Burial> {
    return this.http.put<Burial>(
      `${environment.url_ms_mortuary}/Burials/${theBurial.id}`,
      theBurial
    );
  }
  delete(id: number) {
    return this.http.delete<Burial>(
      `${environment.url_ms_mortuary}/Burials/${id}`
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Headquarter } from "../models/headquarter.model";

@Injectable({
  providedIn: "root",
})
export class HeadquarterService {
  constructor(private http: HttpClient) {}

  list(): Observable<Headquarter[]> {
    return this.http.get<Headquarter[]>(
      `${environment.url_ms_mortuary}/Headquarters`
    );
  }
  view(id: number): Observable<Headquarter> {
    return this.http.get<Headquarter>(
      `${environment.url_ms_mortuary}/Headquarters/${id}`
    );
  }
  create(theHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.post<Headquarter>(
      `${environment.url_ms_mortuary}/Headquarters/`,
      theHeadquarter
    );
  }
  update(theHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.put<Headquarter>(
      `${environment.url_ms_mortuary}/Headquarters/${theHeadquarter.id}`,
      theHeadquarter
    );
  }
  delete(id: number) {
    return this.http.delete<Headquarter>(
      `${environment.url_ms_mortuary}/Headquarters/${id}`
    );
  }
}

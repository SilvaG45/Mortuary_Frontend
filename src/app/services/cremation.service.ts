import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Cremation } from "../models/cremation.model";

@Injectable({
  providedIn: "root",
})
export class CremationService {
  constructor(private http: HttpClient) {}

  list(): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(
      `${environment.url_ms_mortuary}/Cremations`
    );
  }
  view(id: number): Observable<Cremation> {
    return this.http.get<Cremation>(
      `${environment.url_ms_mortuary}/Cremations/${id}`
    );
  }
  create(theCremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(
      `${environment.url_ms_mortuary}/Cremations/`,
      theCremation
    );
  }
  update(theCremation: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(
      `${environment.url_ms_mortuary}/Cremations/${theCremation.id}`,
      theCremation
    );
  }
  delete(id: number) {
    return this.http.delete<Cremation>(
      `${environment.url_ms_mortuary}/Cremations/${id}`
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Relocation } from "../models/relocation.model";

@Injectable({
  providedIn: "root",
})
export class RelocationService {
  constructor(private http: HttpClient) {}

  list(): Observable<Relocation[]> {
    return this.http.get<Relocation[]>(
      `${environment.url_ms_mortuary}/Relocations`
    );
  }
  view(id: number): Observable<Relocation> {
    return this.http.get<Relocation>(
      `${environment.url_ms_mortuary}/Relocations/${id}`
    );
  }
  create(theRelocation: Relocation): Observable<Relocation> {
    return this.http.post<Relocation>(
      `${environment.url_ms_mortuary}/Relocations/`,
      theRelocation
    );
  }
  update(theRelocation: Relocation): Observable<Relocation> {
    return this.http.put<Relocation>(
      `${environment.url_ms_mortuary}/Relocations/${theRelocation.id}`,
      theRelocation
    );
  }
  delete(id: number) {
    return this.http.delete<Relocation>(
      `${environment.url_ms_mortuary}/Relocations/${id}`
    );
  }
}

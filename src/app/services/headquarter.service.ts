import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Headquarter } from "../models/headquarter.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HeadquarterService {
  constructor(private http: HttpClient) {}
  list(): Observable<Headquarter[]> {
    return this.http.get<Headquarter[]>(`${environment.url_ms_mortuary}/headquarters`);
  }
  delete(id: number) {
    return this.http.delete<Headquarter>(`${environment.url_ms_mortuary}/headquarters/${id}`);
  }
}

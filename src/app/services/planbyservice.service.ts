import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlanByService } from "../models/plan-by-service.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PlanbyserviceService {
  constructor(private http: HttpClient) {}
  list(): Observable<PlanByService[]> {
    return this.http.get<PlanByService[]>(`${environment.url_ms_mortuary}/planesbyservice`);
  }
  delete(id: number) {
    return this.http.delete<PlanByService>(`${environment.url_ms_mortuary}/planesbyservice/${id}`);
  }
}

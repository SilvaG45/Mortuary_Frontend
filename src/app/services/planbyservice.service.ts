import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { PlanByService } from "../models/plan-by-service.model";

@Injectable({
  providedIn: "root",
})
export class PlanByServiceService {
  constructor(private http: HttpClient) {}

  list(): Observable<PlanByService[]> {
    return this.http.get<PlanByService[]>(
      `${environment.url_ms_mortuary}/PlanByService`
    );
  }
  view(id: number): Observable<PlanByService> {
    return this.http.get<PlanByService>(
      `${environment.url_ms_mortuary}/PlanByService/${id}`
    );
  }
  create(thePlanByService: PlanByService): Observable<PlanByService> {
    return this.http.post<PlanByService>(
      `${environment.url_ms_mortuary}/PlanByService/`,
      thePlanByService
    );
  }
  update(thePlanByService: PlanByService): Observable<PlanByService> {
    return this.http.put<PlanByService>(
      `${environment.url_ms_mortuary}/PlanByService/${thePlanByService.id}`,
      thePlanByService
    );
  }
  delete(id: number) {
    return this.http.delete<PlanByService>(
      `${environment.url_ms_mortuary}/PlanByService/${id}`
    );
  }
}

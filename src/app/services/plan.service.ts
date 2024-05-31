import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Plan, ResponsePlan } from "../models/plan.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PlanService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponsePlan> {
    return this.http.get<ResponsePlan>(`${environment.url_ms_cinema}/Plans`);
  }
  view(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${environment.url_ms_cinema}/Plans/${id}`);
  }
  create(thePlan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${environment.url_ms_cinema}/Plans/`, thePlan);
  }
  update(thePlan: Plan): Observable<Plan> {
    return this.http.put<Plan>(
      `${environment.url_ms_cinema}/Plans/${thePlan.id}`,
      thePlan
    );
  }
  delete(id: number) {
    return this.http.delete<Plan>(`${environment.url_ms_cinema}/Plans/${id}`);
  }
}

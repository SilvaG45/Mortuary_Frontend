import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Plan, ResponseOnePlan, ResponsePlan } from "../models/plan.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PlanService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponsePlan> {
    return this.http.get<ResponsePlan>(`${environment.url_ms_cinema}/Plans`);
  }
  view(id: number): Observable<ResponseOnePlan> {
    return this.http.get<ResponseOnePlan>(
      `${environment.url_ms_cinema}/Plans/${id}`
    );
  }
  create(thePlan: Plan): Observable<ResponseOnePlan> {
    return this.http.post<ResponseOnePlan>(
      `${environment.url_ms_cinema}/Plans/`,
      thePlan
    );
  }
  update(thePlan: Plan): Observable<ResponseOnePlan> {
    return this.http.put<ResponseOnePlan>(
      `${environment.url_ms_cinema}/Plans/${thePlan.id}`,
      thePlan
    );
  }
  delete(id: number) {
    return this.http.delete<Plan>(`${environment.url_ms_cinema}/Plans/${id}`);
  }
}

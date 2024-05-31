import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ServiceExecution,
  ResponeOneServiceExecution,
  ResponeServiceExecution,
} from "../models/service-execution.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ServiceExecutionService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponeServiceExecution> {
    return this.http.get<ResponeServiceExecution>(
      `${environment.url_ms_cinema}/ServiceExecutions`
    );
  }
  view(id: number): Observable<ResponeOneServiceExecution> {
    return this.http.get<ResponeOneServiceExecution>(
      `${environment.url_ms_cinema}/ServiceExecutions/${id}`
    );
  }
  create(
    ServiceExecution: ServiceExecution
  ): Observable<ResponeOneServiceExecution> {
    return this.http.post<ResponeOneServiceExecution>(
      `${environment.url_ms_cinema}/ServiceExecutions/`,
      ServiceExecution
    );
  }
  update(
    ServiceExecution: ServiceExecution
  ): Observable<ResponeOneServiceExecution> {
    return this.http.put<ResponeOneServiceExecution>(
      `${environment.url_ms_cinema}/ServiceExecutions/${ServiceExecution.id}`,
      ServiceExecution
    );
  }
  delete(id: number) {
    return this.http.delete<ServiceExecution>(
      `${environment.url_ms_cinema}/ServiceExecutions/${id}`
    );
  }
}

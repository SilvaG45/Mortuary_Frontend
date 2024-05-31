import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Department } from "../models/department.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  list(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url_ms_mortuary}/departments`);
  }
  delete(id: number) {
    return this.http.delete<Department>(`${environment.url_ms_mortuary}/departments/${id}`);
  }
}

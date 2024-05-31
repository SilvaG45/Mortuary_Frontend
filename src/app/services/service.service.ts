import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ResponseOneService,
  ResponseService,
  Service,
} from "../models/service.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseService> {
    return this.http.get<ResponseService>(
      `${environment.url_ms_cinema}/Services`
    );
  }
  view(id: number): Observable<ResponseOneService> {
    return this.http.get<ResponseOneService>(
      `${environment.url_ms_cinema}/Services/${id}`
    );
  }
  create(theService: Service): Observable<ResponseOneService> {
    return this.http.post<ResponseOneService>(
      `${environment.url_ms_cinema}/Services/`,
      theService
    );
  }
  update(theService: Service): Observable<ResponseOneService> {
    return this.http.put<ResponseOneService>(
      `${environment.url_ms_cinema}/Services/${theService.id}`,
      theService
    );
  }
  delete(id: number) {
    return this.http.delete<Service>(
      `${environment.url_ms_cinema}/Services/${id}`
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Holder,
  ResponseHolder,
  ResponseOneHolder,
} from "../models/holder.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HolderService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseHolder> {
    return this.http.get<ResponseHolder>(
      `${environment.url_ms_cinema}/Holders`
    );
  }
  view(id: number): Observable<ResponseOneHolder> {
    return this.http.get<ResponseOneHolder>(
      `${environment.url_ms_cinema}/Holders/${id}`
    );
  }
  create(theHolder: Holder): Observable<ResponseOneHolder> {
    return this.http.post<ResponseOneHolder>(
      `${environment.url_ms_cinema}/Holders/`,
      theHolder
    );
  }
  update(theHolder: Holder): Observable<ResponseOneHolder> {
    return this.http.put<ResponseOneHolder>(
      `${environment.url_ms_cinema}/Holders/${theHolder.id}`,
      theHolder
    );
  }
  delete(id: number) {
    return this.http.delete<Holder>(
      `${environment.url_ms_cinema}/Holders/${id}`
    );
  }
}

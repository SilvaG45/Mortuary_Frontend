import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Membership,
  ResponseMembership,
  ResponseOneMembership,
} from "../models/membership.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MembershipService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseMembership> {
    return this.http.get<ResponseMembership>(
      `${environment.url_ms_cinema}/Memberships`
    );
  }
  view(id: number): Observable<ResponseOneMembership> {
    return this.http.get<ResponseOneMembership>(
      `${environment.url_ms_cinema}/Memberships/${id}`
    );
  }
  create(theMembershMembership: Membership): Observable<ResponseOneMembership> {
    return this.http.post<ResponseOneMembership>(
      `${environment.url_ms_cinema}/Memberships/`,
      theMembershMembership
    );
  }
  update(theMembershMembership: Membership): Observable<ResponseOneMembership> {
    return this.http.put<ResponseOneMembership>(
      `${environment.url_ms_cinema}/Memberships/${theMembershMembership.id}`,
      theMembershMembership
    );
  }
  delete(id: number) {
    return this.http.delete<Membership>(
      `${environment.url_ms_cinema}/Memberships/${id}`
    );
  }
}

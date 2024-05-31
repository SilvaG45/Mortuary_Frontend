import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Room } from "../models/room.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient) {}
  list(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.url_ms_mortuary}/rooms`);
  }
  delete(id: number) {
    return this.http.delete<Room>(`${environment.url_ms_mortuary}/rooms/${id}`);
  }
}

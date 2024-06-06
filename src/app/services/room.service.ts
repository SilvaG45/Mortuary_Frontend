import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Room } from "../models/room.model";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient) {}

  list(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.url_ms_mortuary}/Rooms`);
  }
  view(id: number): Observable<Room> {
    return this.http.get<Room>(
      `${environment.url_ms_mortuary}/Rooms/${id}`
    );
  }
  create(theRoom: Room): Observable<Room> {
    return this.http.post<Room>(
      `${environment.url_ms_mortuary}/Rooms/`,
      theRoom
    );
  }
  update(theRoom: Room): Observable<Room> {
    return this.http.put<Room>(
      `${environment.url_ms_mortuary}/Rooms/${theRoom.id}`,
      theRoom
    );
  }
  delete(id: number) {
    return this.http.delete<Room>(
      `${environment.url_ms_mortuary}/Rooms/${id}`
    );
  }
}

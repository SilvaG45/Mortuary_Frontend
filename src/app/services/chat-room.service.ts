import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChatRoom } from "../models/chat-room.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ChatRoomService {
  constructor(private http: HttpClient) {}
  list(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(`${environment.url_ms_cinema}/ChatRooms`);
  }
  view(id: number): Observable<ChatRoom> {
    return this.http.get<ChatRoom>(
      `${environment.url_ms_cinema}/ChatRooms/${id}`
    );
  }
  create(theChatRoom: ChatRoom): Observable<ChatRoom> {
    return this.http.post<ChatRoom>(
      `${environment.url_ms_cinema}/ChatRooms/`,
      theChatRoom
    );
  }
  update(theChatRoom: ChatRoom): Observable<ChatRoom> {
    return this.http.put<ChatRoom>(
      `${environment.url_ms_cinema}/ChatRooms/${theChatRoom.id}`,
      theChatRoom
    );
  }
  delete(id: number) {
    return this.http.delete<ChatRoom>(
      `${environment.url_ms_cinema}/ChatRooms/${id}`
    );
  }
}

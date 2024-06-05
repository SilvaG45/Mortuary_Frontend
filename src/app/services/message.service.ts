import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  Message,
  ResponseMessage,
  ResponseOneMessage,
} from "../models/message.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(private http: HttpClient) {}
  list(): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `${environment.url_ms_cinema}/Messages`
    );
  }
  view(id: number): Observable<ResponseOneMessage> {
    return this.http.get<ResponseOneMessage>(
      `${environment.url_ms_cinema}/Messages/${id}`
    );
  }
  create(message: Message): Observable<Message> {
    return this.http.post<Message>(
      `${environment.url_ms_cinema}/Messages/`,
      message
    );
  }
  update(message: Message): Observable<Message> {
    return this.http.put<Message>(
      `${environment.url_ms_cinema}/Messages/${message.id}`,
      message
    );
  }
  delete(id: number) {
    return this.http.delete<Message>(
      `${environment.url_ms_cinema}/Messages/${id}`
    );
  }
}

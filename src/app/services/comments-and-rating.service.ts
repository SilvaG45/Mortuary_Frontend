import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentsAndRating } from "../models/comments-and-rating.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommentsAndRatingService {
  constructor(private http: HttpClient) {}
  list(): Observable<CommentsAndRating[]> {
    return this.http.get<CommentsAndRating[]>(
      `${environment.url_ms_cinema}/CommentsAndRatings`
    );
  }
  view(id: number): Observable<CommentsAndRating> {
    return this.http.get<CommentsAndRating>(
      `${environment.url_ms_cinema}/CommentsAndRatings/${id}`
    );
  }
  create(
    theCommentsAndRating: CommentsAndRating
  ): Observable<CommentsAndRating> {
    return this.http.post<CommentsAndRating>(
      `${environment.url_ms_cinema}/CommentsAndRatings/`,
      theCommentsAndRating
    );
  }
  update(
    theCommentsAndRating: CommentsAndRating
  ): Observable<CommentsAndRating> {
    return this.http.put<CommentsAndRating>(
      `${environment.url_ms_cinema}/CommentsAndRatings/${theCommentsAndRating.id}`,
      theCommentsAndRating
    );
  }
  delete(id: number) {
    return this.http.delete<CommentsAndRating>(
      `${environment.url_ms_cinema}/CommentsAndRatings/${id}`
    );
  }
}

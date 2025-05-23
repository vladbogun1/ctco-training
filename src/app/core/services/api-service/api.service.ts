import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostDto} from "../../models/post.model";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = 'api';

  constructor(
    readonly http: HttpClient,
  ) {
  }

  getAllPosts(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(`${this.baseUrl}/posts`)
      .pipe(
        tap(() => console.log('Fetched posts'))
      )
  }


}

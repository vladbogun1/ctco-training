import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PostDto } from "../../models/post.model";
import { Observable, tap } from "rxjs";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
  ) {}

  getAllPosts(): Observable<PostDto[]> {
    const url = `${this.baseUrl}/posts`;
    return this.http.get<PostDto[]>(url).pipe(
      tap(() => console.log('Fetched posts from:', url))
    );
  }
}

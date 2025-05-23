import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostDto} from "../../models/post.model";
import {map, Observable, switchMap, tap} from "rxjs";
import {environment} from '../../../../environments/environment';
import {CommentDto} from "../../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
  ) {}


  // API CALLS

  getAllPosts(): Observable<PostDto[]> {
    const url = `${this.baseUrl}/posts`;
    console.log('Fetching posts from:', url);
    return this.http.get<PostDto[]>(url).pipe(
      tap(() => console.log('Fetched posts from:', url))
    );
  }

  getPostById(postId: number): Observable<PostDto> {
    const url = `${this.baseUrl}/posts/${postId}`;
    console.log('Fetching post from:', url);
    return this.http.get<PostDto>(url).pipe(
      tap(() => console.log('Fetched post from:', url))
    );
  }

  getCommentsByPostId(postId: number): Observable<CommentDto[]> {
    const url = `${this.baseUrl}/posts/${postId}/comments`;
    console.log('Fetching comments from:', url);
    return this.http.get<CommentDto[]>(url).pipe(
      tap(() => console.log('Fetched comments from:', url))
    );
  }


  // HELPER METHODS

  getFullPostById(postId: number): Observable<PostDto> {
    return this.getPostById(postId).pipe(
      switchMap((post: PostDto) => this.fetchCommentsForPost(post))
    );
  }

  fetchCommentsForPost(post: PostDto): Observable<PostDto> {
    if (!post.id) {
      throw new Error('Post ID is required');
    }
    const postId = post.id;
    return this.getCommentsByPostId(postId).pipe(
      map((comments: CommentDto[]) => ({...post, comments})),
    );
  }
}

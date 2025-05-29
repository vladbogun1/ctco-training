import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { PostDto } from '../../models/post.model';
import {environment} from "../../../../environments/environment";

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApiService
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllPosts', () => {
    it('should return an Observable<PostDto[]> with posts', () => {
      const mockPosts: PostDto[] = [
        { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' }
      ];

      const subscription = service.getAllPosts().subscribe({
        next: (posts) => {
          expect(posts.length).toBe(1);
          expect(posts).toEqual(mockPosts);
        },
        error: fail
      });

      const req = httpMock.expectOne(`${baseUrl}/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);

      subscription.unsubscribe();
    });
  });
});

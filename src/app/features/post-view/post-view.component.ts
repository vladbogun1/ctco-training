import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../core/services/api-service/api.service";
import { Subscription, switchMap, catchError, of, finalize } from "rxjs";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PostDto } from "../../core/models/post.model";
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { GravatarPipe } from '../../core/pipes/gravatar.pipe';
import {AppRoutes} from "../../app-routes";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-post-view',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
    GravatarPipe,
    NgOptimizedImage
  ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent implements OnInit, OnDestroy {
  private post$!: Subscription;
  protected post: PostDto | null = null;
  protected isLoading = true;
  protected error: string | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParamAndFetchPost();
  }

  ngOnDestroy(): void {
    if (this.post$) {
      this.post$.unsubscribe();
    }
  }

  protected getParamAndFetchPost(): void {
    this.isLoading = true;
    this.error = null;

    this.post$ = this.route.params.pipe(
      switchMap(params => {
        const postId = +params['id'];
        if (isNaN(postId)) {
          throw new Error('Invalid post ID');
        }
        return this.apiService.getFullPostById(postId);
      }),
      catchError(error => {
        console.error('Error loading post:', error);
        this.error = 'Failed to load post. Please try again later.';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (post) => {
        if (post) {
          this.post = post;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Subscription error:', error);
        this.error = 'An unexpected error occurred.';
      }
    });
  }

  protected readonly AppRoutes = AppRoutes;
}

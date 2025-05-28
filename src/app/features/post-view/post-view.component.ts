import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api-service/api.service";
import {Subscription, switchMap, catchError, of, finalize} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PostDto} from "../../core/models/post.model";
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {GravatarPipe} from '../../core/pipes/gravatar.pipe';
import {AppRoutes} from "../../app-routes";
import {StarRatingComponent} from '../../shared/components/star-rating/star-rating.component';
import {RatingStats} from '../../core/models/rating.model';
import {RatingService} from '../../core/services/rating/rating.service';

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
    NgOptimizedImage,
    StarRatingComponent
  ],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent implements OnInit, OnDestroy {
  private post$!: Subscription;
  protected post: PostDto | null = null;
  protected isLoading = true;
  protected error: string | null = null;
  protected ratingStats: RatingStats = {average: 0, count: 0, userRating: undefined};
  protected readonly AppRoutes = AppRoutes;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly ratingService: RatingService
  ) {
  }

  ngOnInit(): void {
    this.getParamAndFetchPost();
  }

  ngOnDestroy(): void {
    if (this.post$) {
      this.post$.unsubscribe();
    }
  }

  onRate(rating: number): void {
    if (this.post) {
      this.ratingService.ratePost(this.post.id, rating);
      this.ratingStats = this.ratingService.getPostRatings(this.post.id);
    }
  }

  private updateRatingStats(id?: number): void {
    if (id) {
      this.ratingStats = this.ratingService.getPostRatings(id);
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
        this.updateRatingStats(postId);
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
}

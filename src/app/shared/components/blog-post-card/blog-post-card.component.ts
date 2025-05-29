import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {PostDto} from "../../../core/models/post.model";
import {RouterLink} from "@angular/router";
import {AppRoutes} from "../../../app-routes";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {RatingStats} from "../../../core/models/rating.model";
import {RatingService} from "../../../core/services/rating/rating.service";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-blog-post-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    StarRatingComponent,
  ],
  templateUrl: './blog-post-card.component.html',
  styleUrls: ['./blog-post-card.component.scss']
})
export class BlogPostCardComponent implements OnInit {
  @Input() post!: PostDto;
  protected readonly AppRoutes = AppRoutes;

  ratingStats: RatingStats = {average: 0, count: 0};

  constructor(private ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.loadRating();
  }

  onRate(rating: number): void {
    this.ratingService.ratePost(this.post.id, rating);
    this.loadRating();
  }

  private loadRating(): void {
    this.ratingStats = this.ratingService.getPostRatings(this.post.id);
  }
}

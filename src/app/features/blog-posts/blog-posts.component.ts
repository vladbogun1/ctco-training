import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../core/services/api-service/api.service";
import { Subscription } from "rxjs";
import { PostDto } from "../../core/models/post.model";
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogPostCardComponent } from '../../shared/components/blog-post-card/blog-post-card.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-blog-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BlogPostCardComponent
  ],
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss'
})
export class BlogPostsComponent implements OnInit, OnDestroy {
  constructor(readonly apiService: ApiService) { }

  posts$!: Subscription;
  posts: PostDto[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.posts$ = this.apiService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }

}

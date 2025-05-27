import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {PostsActions} from '../../core/store/posts/posts.actions';
import {selectError, selectIsLoading, selectPosts} from '../../core/store/posts/posts.selectors';
import {PostsFiltersComponent} from "../posts/components/posts-filters/posts-filters.component";
import {BlogPostCardComponent} from "../../shared/components/blog-post-card/blog-post-card.component";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-blog-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    PostsFiltersComponent,
    BlogPostCardComponent
  ],
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss'
})
export class BlogPostsComponent implements OnInit, OnDestroy {
  private storeSubs = new Subscription();

  posts$ = this.store.select(selectPosts);
  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectError);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadPosts());
  }

  onFilterChange(): void {
    this.store.dispatch(PostsActions.loadPosts());
  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }
}

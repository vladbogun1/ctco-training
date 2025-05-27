import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogPostsComponent } from './blog-posts.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BlogPostCardComponent } from '../../shared/components/blog-post-card/blog-post-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store, createSelector } from '@ngrx/store';
import { PostsActions } from '../../core/store/posts/posts.actions';
import {PostDto} from "../../core/models/post.model";

interface AppState {
  posts: {
    posts: PostDto[];
    filteredPosts: PostDto[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    userId: number | null;
    sortKey: string | null;
    sortDirection: 'asc' | 'desc';
  };
}

const selectPostsState = (state: AppState) => state.posts;
const selectFilteredPosts = createSelector(
  selectPostsState,
  (state) => state.filteredPosts
);
const selectIsLoading = createSelector(
  selectPostsState,
  (state) => state.isLoading
);
const selectError = createSelector(
  selectPostsState,
  (state) => state.error
);

describe('BlogPostsComponent', () => {
  let component: BlogPostsComponent;
  let fixture: ComponentFixture<BlogPostsComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    posts: {
      posts: [],
      filteredPosts: [],
      isLoading: false,
      error: null,
      searchTerm: '',
      userId: null,
      sortKey: null,
      sortDirection: 'asc'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogPostsComponent,
        BlogPostCardComponent,
        MatProgressSpinnerModule
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectFilteredPosts, value: [] },
            { selector: selectIsLoading, value: false },
            { selector: selectError, value: null }
          ]
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(BlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPosts action on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(PostsActions.loadPosts());
  });
});

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.filteredPosts
);

export const selectAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectIsLoading = createSelector(
  selectPostsState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectPostsState,
  (state) => state.error
);

export const selectSearchTerm = createSelector(
  selectPostsState,
  (state) => state.searchTerm
);

export const selectUserIdFilter = createSelector(
  selectPostsState,
  (state) => state.userId
);

export const selectSortKey = createSelector(
  selectPostsState,
  (state) => state.sortKey
);

export const selectSortDirection = createSelector(
  selectPostsState,
  (state) => state.sortDirection
);

export const selectUniqueUserIds = createSelector(selectAllPosts, (posts) => {
  const userIds = new Set<number>();
  posts.forEach((post) => userIds.add(post.userId));
  return Array.from(userIds).sort((a, b) => a - b);
});

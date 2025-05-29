import { createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';
import { PostsState, initialState } from './posts.state';
import {PostDto} from "../../models/post.model";

export const postsReducer = createReducer<PostsState>(
  initialState,
  // Load Posts
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    filteredPosts: applyFiltersAndSorting({ ...state, posts }),
    isLoading: false,
  })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  // Filters and Sorting
  on(PostsActions.setSearchTerm, (state, { searchTerm }) => {
    const newState = { ...state, searchTerm };
    return {
      ...newState,
      filteredPosts: applyFiltersAndSorting(newState),
    };
  }),
  on(PostsActions.setUserFilter, (state, { userId }) => {
    const newState = { ...state, userId };
    return {
      ...newState,
      filteredPosts: applyFiltersAndSorting(newState),
    };
  }),
  on(PostsActions.setSortKey, (state, { sortKey }) => {
    const newState = { ...state, sortKey };
    return {
      ...newState,
      filteredPosts: applyFiltersAndSorting(newState),
    };
  }),
  on(PostsActions.setSortDirection, (state, { sortDirection }) => {
    const newState = { ...state, sortDirection };
    return {
      ...newState,
      filteredPosts: applyFiltersAndSorting(newState),
    };
  }),
  on(PostsActions.resetFilters, (state) => ({
    ...state,
    searchTerm: '',
    userId: null,
    sortKey: null,
    sortDirection: 'asc',
    filteredPosts: applyFiltersAndSorting({
      ...state,
      searchTerm: '',
      userId: null,
      sortKey: null,
      sortDirection: 'asc',
    }),
  }))
);

function applyFiltersAndSorting(state: PostsState): PostDto[] {
  let filtered = [...state.posts];

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
    );
  }

  if (state.userId) {
    filtered = filtered.filter((post) => post.userId === state.userId);
  }

  if (state.sortKey) {
    filtered.sort((a, b) => {
      const aValue = a[state.sortKey as keyof typeof a] ?? '';
      const bValue = b[state.sortKey as keyof typeof b] ?? '';

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

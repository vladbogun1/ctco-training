import { PostDto } from '../../models/post.model';

export interface PostsState {
  posts: PostDto[];
  filteredPosts: PostDto[];
  searchTerm: string;
  userId: number | null;
  sortKey: keyof PostDto | null;
  sortDirection: 'asc' | 'desc';
  isLoading: boolean;
  error: string | null;
}

export const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  searchTerm: '',
  userId: null,
  sortKey: null,
  sortDirection: 'asc',
  isLoading: false,
  error: null,
};

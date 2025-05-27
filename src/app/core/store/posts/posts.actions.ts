import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PostDto } from '../../models/post.model';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: PostDto[] }>(),
    'Load Posts Failure': props<{ error: string }>(),
    'Set Search Term': props<{ searchTerm: string }>(),
    'Set User Filter': props<{ userId: number | null }>(),
    'Set Sort Key': props<{ sortKey: keyof PostDto | null }>(),
    'Set Sort Direction': props<{ sortDirection: 'asc' | 'desc' }>(),
    'Reset Filters': emptyProps(),
  },
});

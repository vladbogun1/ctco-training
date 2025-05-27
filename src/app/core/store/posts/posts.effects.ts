import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api-service/api.service';
import { PostsActions } from './posts.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PostsEffects {
  /**
   * Effect to load all posts
   */
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      tap(() => console.log('Loading posts...')),
      switchMap(() =>
        this.apiService.getAllPosts().pipe(
          tap((posts) => console.log('Successfully loaded posts:', posts.length)),
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) => {
            const errorMessage = error.message || 'Failed to load posts';
            console.error('Error loading posts:', errorMessage);
            this.showError('Failed to load posts. Please try again.');
            return of(PostsActions.loadPostsFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  /**
   * Shows an error message using MatSnackBar
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly snackBar: MatSnackBar
  ) {}
}

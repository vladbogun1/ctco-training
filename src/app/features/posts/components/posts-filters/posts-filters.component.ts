import { CommonModule } from '@angular/common';
import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostsActions } from '../../../../core/store/posts/posts.actions';
import { selectSearchTerm, selectSortDirection, selectSortKey, selectUniqueUserIds, selectUserIdFilter } from '../../../../core/store/posts/posts.selectors';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-posts-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './posts-filters.component.html',
  styleUrls: ['./posts-filters.component.scss'],
})
export class PostsFiltersComponent implements OnDestroy {
  @Output() filterChanged = new EventEmitter<void>();

  filterForm: FormGroup;
  sortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'title', label: 'Title' },
    { value: 'userId', label: 'User' },
  ];

  uniqueUserIds: number[] = [];
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.filterForm = new FormGroup({
      searchTerm: new FormControl(''),
      userId: new FormControl(null),
      sortKey: new FormControl(null),
      sortDirection: new FormControl('asc'),
    });

    // Subscribe to store for initial values
    this.store.select(selectSearchTerm).subscribe(term => {
      this.filterForm.patchValue({ searchTerm: term || '' }, { emitEvent: false });
    });

    this.store.select(selectUserIdFilter).subscribe(userId => {
      this.filterForm.patchValue({ userId }, { emitEvent: false });
    });

    this.store.select(selectSortKey).subscribe(sortKey => {
      this.filterForm.patchValue({ sortKey }, { emitEvent: false });
    });

    this.store.select(selectSortDirection).subscribe(sortDirection => {
      this.filterForm.patchValue({ sortDirection }, { emitEvent: false });
    });

    this.store.select(selectUniqueUserIds).subscribe(userIds => {
      this.uniqueUserIds = userIds;
    });

    // React to form changes
    this.filterForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.store.dispatch(PostsActions.setSearchTerm({ searchTerm: value }));
        this.filterChanged.emit();
      });

    this.filterForm.get('userId')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.store.dispatch(PostsActions.setUserFilter({ userId: value }));
        this.filterChanged.emit();
      });

    this.filterForm.get('sortKey')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.store.dispatch(PostsActions.setSortKey({ sortKey: value }));
        this.filterChanged.emit();
      });

    this.filterForm.get('sortDirection')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.store.dispatch(PostsActions.setSortDirection({ sortDirection: value }));
        this.filterChanged.emit();
      });
  }


  resetFilters(): void {
    this.store.dispatch(PostsActions.resetFilters());
    this.filterChanged.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

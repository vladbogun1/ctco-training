import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GuestBookEntry } from '../../../../core/models/guest-book-entry.model';
import { GravatarPipe } from '../../../../core/pipes/gravatar.pipe';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-guest-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    GravatarPipe,
    DatePipe
  ],
  templateUrl: './guest-book-list.component.html',
  styleUrls: ['./guest-book-list.component.scss']
})
export class GuestBookListComponent {
  @Input() entries: GuestBookEntry[] = [];
  @Input() selectedEntryId: string | null = null;
  @Input() isLoading: boolean = false;
  @Output() viewEntry = new EventEmitter<string>();
  @Output() addNewEntry = new EventEmitter<void>();

  defaultAvatar = 'assets/images/default-avatar.png';

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }

  onViewEntry(entryId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.viewEntry.emit(entryId);
  }

  onAddNewEntry(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.addNewEntry.emit();
  }
}

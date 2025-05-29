import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { GuestBookEntry } from '../../../../core/models/guest-book-entry.model';
import { GuestBookService } from '../../../../core/services/guest-book/guest-book.service';
import { GuestBookListComponent } from '../../components/guest-book-list/guest-book-list.component';
import { GuestBookDetailComponent } from '../../components/guest-book-detail/guest-book-detail.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-guest-book-list-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    GuestBookListComponent
  ],
  templateUrl: './guest-book-list-view.component.html',
  styleUrls: ['./guest-book-list-view.component.scss']
})
export class GuestBookListViewComponent implements OnInit, OnDestroy {
  entries: GuestBookEntry[] = [];
  selectedEntryId: string | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  private routeSub: Subscription | null = null;
  private dialogRef: MatDialogRef<GuestBookDetailComponent> | null = null;

  constructor(
    private guestBookService: GuestBookService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEntries();

    this.routeSub = this.route.paramMap.subscribe(params => {
      const entryId = params.get('id');
      if (this.dialogRef) {
        this.dialogRef.close();
        this.dialogRef = null;
      }

      if (entryId && entryId !== 'new') {
        this.selectedEntryId = entryId;
        this.showEntryDetails(entryId);
      } else {
        this.selectedEntryId = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  loadEntries(): void {
    this.isLoading = true;
    this.error = null;
    this.entries = this.guestBookService.getEntries();
    this.isLoading = false;
  }

  onAddEntry(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onViewEntry(entryId: string): void {
    this.router.navigate([entryId], { relativeTo: this.route });
  }

  private showEntryDetails(entryId: string): void {
    const entry = this.guestBookService.getEntry(entryId);
    if (entry) {
      this.dialogRef = this.dialog.open(GuestBookDetailComponent, {
        width: '600px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        data: entry,
        panelClass: 'guest-book-dialog',
        autoFocus: false,
        disableClose: true
      });

      this.dialogRef.afterClosed().subscribe(() => {
        if (this.router.url.includes(entryId)) {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
        this.dialogRef = null;
      });
    }
  }
}

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { GuestBookEntry } from '../../../../core/models/guest-book-entry.model';
import { GravatarPipe } from '../../../../core/pipes/gravatar.pipe';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-guest-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    GravatarPipe,
    DatePipe,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './guest-book-detail.component.html',
  styleUrls: ['./guest-book-detail.component.scss']
})
export class GuestBookDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<GuestBookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public entry: GuestBookEntry
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

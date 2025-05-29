import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GuestBookForm } from '../../../../core/models/guest-book-entry.model';
import { GuestBookService } from '../../../../core/services/guest-book/guest-book.service';
import { GuestBookFormComponent } from '../../components/guest-book-form/guest-book-form.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-guest-book-form-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    GuestBookFormComponent
  ],
  templateUrl: './guest-book-form-view.component.html',
  styleUrls: ['./guest-book-form-view.component.scss']
})
export class GuestBookFormViewComponent {
  constructor(
    private guestBookService: GuestBookService,
    private router: Router
  ) {}

  onSubmit(formData: GuestBookForm): void {
    console.log('Submitting form data:', formData);
    this.guestBookService.addEntry(formData);
    this.router.navigate(['/guest-book']);
  }

  onCancel(): void {
    this.router.navigate(['/guest-book']);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GuestBookForm } from '../../../../core/models/guest-book-entry.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-guest-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './guest-book-form.component.html',
  styleUrls: ['./guest-book-form.component.scss']
})
export class GuestBookFormComponent {
  @Output() submitForm = new EventEmitter<GuestBookForm>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      authorName: ['', [Validators.required]],
      authorEmail: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.submitForm.emit(this.form.value);
    }
  }
}

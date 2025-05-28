import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ctco-star-rating',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Input() color: string = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showAverage: boolean = false;
  @Input() ratingStats: { average: number; count: number } = {average: 0, count: 0};
  @Input() readonly: boolean = false;

  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];
  currentRating: number = 0;
  hoverRating: number = 0;

  ngOnInit() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.currentRating = this.rating;
  }

  get isHovering(): boolean {
    return this.hoverRating > 0;
  }

  getStarIcon(star: number): string {
    if (this.isHovering) {
      return star <= this.hoverRating ? 'star' : 'star_border';
    }

    if (this.currentRating >= star) {
      return 'star';
    } else if (this.currentRating > star - 1) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }

  onClick(rating: number): void {
    if (this.readonly) return;

    this.currentRating = rating === this.currentRating ? 0 : rating;
    this.ratingChange.emit(this.currentRating);
  }

  onHover(rating: number): void {
    if (this.readonly) return;
    this.hoverRating = rating;
  }

  onMouseLeave(): void {
    this.hoverRating = 0;
  }
}

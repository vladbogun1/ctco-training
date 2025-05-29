import {Injectable} from '@angular/core';
import {Rating, RatingStats} from '../../models/rating.model';

const STORAGE_KEY = 'blog-post-ratings';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratings: Rating[] = [];

  constructor() {
    this.loadRatings();
  }

  private loadRatings(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.ratings = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load ratings from localStorage', e);
        this.ratings = [];
      }
    }
  }

  private saveRatings(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ratings));
    } catch (e) {
      console.error('Failed to save ratings to localStorage', e);
    }
  }

  ratePost(postId: number, value: number): void {
    if (value < 1 || value > 5) return;
    this.ratings = this.ratings.filter(r => r.postId !== postId);
    const newRating: Rating = {
      postId,
      value,
      createdAt: Date.now()
    };

    this.ratings.push(newRating);
    this.saveRatings();
  }

  getPostRatings(postId: number): RatingStats {
    const postRatings = this.ratings.filter(r => r.postId === postId);

    if (postRatings.length === 0) {
      return {average: 0, count: 0};
    }

    const sum = postRatings.reduce((acc, curr) => acc + curr.value, 0);
    const average = Math.round((sum / postRatings.length) * 10) / 10;

    return {
      average,
      count: postRatings.length,
      userRating: this.getUserRating(postId)
    };
  }

  private getUserRating(postId: number): number | undefined {
    const rating = this.ratings.find(r => r.postId === postId);
    return rating?.value;
  }

  clearAllRatings(): void {
    this.ratings = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}

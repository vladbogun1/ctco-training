export interface Rating {
  postId: number;
  value: number;
  createdAt: number;
}

export interface RatingStats {
  average: number;
  count: number;
  userRating?: number;
}

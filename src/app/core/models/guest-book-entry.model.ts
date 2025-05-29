export interface GuestBookEntry {
  id: string;
  authorName: string;
  authorEmail: string;
  message: string;
  createdAt: number; // timestamp
}

export interface GuestBookForm {
  authorName: string;
  authorEmail: string;
  message: string;
}

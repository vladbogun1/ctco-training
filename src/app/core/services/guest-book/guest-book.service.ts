import { Injectable } from '@angular/core';
import { GuestBookEntry } from '../../models/guest-book-entry.model';

@Injectable({
  providedIn: 'root'
})
export class GuestBookService {
  private entries: GuestBookEntry[] = [];
  private readonly STORAGE_KEY = 'guest-book-entries';

  constructor() {
    this.loadEntries();
  }

  private loadEntries(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.entries = stored ? JSON.parse(stored) : [];
  }

  private saveEntries(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.entries));
  }

  addEntry(entry: Omit<GuestBookEntry, 'id' | 'createdAt'>): GuestBookEntry {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    this.entries.unshift(newEntry);
    this.saveEntries();
    return newEntry;
  }

  getEntries(): GuestBookEntry[] {
    return [...this.entries];
  }

  getEntry(id: string): GuestBookEntry | undefined {
    return this.entries.find(e => e.id === id);
  }

  deleteEntry(id: string): boolean {
    const initialLength = this.entries.length;
    this.entries = this.entries.filter(e => e.id !== id);
    if (this.entries.length !== initialLength) {
      this.saveEntries();
      return true;
    }
    return false;
  }
}

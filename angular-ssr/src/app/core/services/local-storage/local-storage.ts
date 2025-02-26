import { Platform } from '@angular/cdk/platform';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { MemoryStorage } from './memory-storage';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage implements Storage {
  private readonly storage: Storage;
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private _platform: Platform) {
    // if (this._platform.isBrowser && window?.localStorage) {
    if (isPlatformBrowser(this.platformId) && window?.localStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = new MemoryStorage();
    }
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
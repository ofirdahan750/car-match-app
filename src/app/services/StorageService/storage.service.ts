import { Injectable } from '@angular/core';

const DATA_STORAGE_KEY = 'formData';
const VISITORS_STORAGE_KEY = 'landingPageVisitorCount';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  public getData(): any[] | null {
    const storedData = localStorage.getItem(DATA_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }
  public storeData(data: any): void {
    const storedData = this.getData() ?? [];
    storedData.push(data);
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(storedData));
  }

  static getVisitorCount(): number {
    const storedCount = localStorage.getItem(VISITORS_STORAGE_KEY) ?? '0';
    return parseInt(storedCount, 10);
  }

  public incrementVisitorCount(): void {
    const currentCount = StorageService.getVisitorCount();
    localStorage.setItem(VISITORS_STORAGE_KEY, `${currentCount + 1}`);
  }
}

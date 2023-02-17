import { Injectable } from '@angular/core';

const DATA_STORAGE_KEY = 'myAppData';
const VISITORS_STORAGE_KEY = 'myAppVisitorCount';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public storeData(data: any): void {
    const storedData = StorageService.getData() ?? [];
    storedData.push(data);
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(storedData));
  }

  static getData(): any[] | null {
    const storedData = localStorage.getItem(DATA_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
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

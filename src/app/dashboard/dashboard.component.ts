import { Component, OnInit } from '@angular/core';
import { FormData } from 'src/models';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  visitorsCount: number = 0;
  visitorsForms: FormData[] | [] = [];
  displayedColumns: string[] = [
    'fullName',
    'gender',
    'email',
    'birthDate',
    'address',
    'city',
    'country',
    'hobbies',
    'color',
    'seats',
    'motorType',
  ];
  constructor(private storageService: StorageService) {
    storageService = new StorageService();
  }
  camelToSpacedWords(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  ngOnInit(): void {
    this.visitorsCount = StorageService.getVisitorCount();
    this.visitorsForms = this.storageService.getData() || [];
  }
}

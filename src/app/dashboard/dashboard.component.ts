import { Component, OnInit } from '@angular/core';
import { FormData } from 'src/models';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  visitorsCount: number = 0;
  visitorsForms: FormData[] | [] = [];
  displayedColumns:string[] = [
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

  constructor(private storageService: StorageService) {}

  camelToSpacedWords(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  ngOnInit(): void {
    this.visitorsCount = StorageService.getVisitorCount();
    this.visitorsForms = this.storageService.getData() || [];
    this.calculateData();
  }

  calculateData(): void {
    const citiesData: { [key: string]: number } = {};
    for (const visitor of this.visitorsForms) {
      const value = visitor.city;
      if (citiesData[value] === undefined) {
        citiesData[value] = 1;
      } else {
        citiesData[value]++;
      }
    }
    this.citiesChart(citiesData);

    const engineForFemales: { [key: string]: number } = {};
    for (const visitor of this.visitorsForms) {
      if (visitor.gender === 'female') {
        const value = visitor.motorType;
        if (engineForFemales[value] === undefined) {
          engineForFemales[value] = 1;
        } else {
          engineForFemales[value]++;
        }
      }
    }
    this.femaleEngineChart(engineForFemales);

    const engineForMales: { [key: string]: number } = {};
    for (const visitor of this.visitorsForms) {
      if (visitor.gender === 'male') {
        const value = visitor.motorType;
        if (engineForMales[value] === undefined) {
          engineForMales[value] = 1;
        } else {
          engineForMales[value]++;
        }
      }
    }
    this.maleEngineChart(engineForMales);

    const hobbies: string[] = [];
    for (const visitor of this.visitorsForms) {
      visitor.hobbies.forEach((element) => {
        hobbies.push(element);
      });
    }
    const hobbiesData: { [key: string]: number } = {};
    for (const hobby of hobbies) {
      const value = hobby;
      hobbiesData[value] = (hobbiesData[value] || 0) + 1;
    }
    this.hobbiesChart(hobbiesData);
  }
  citiesChart(citiesData: { [key: string]: number }): void {
    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: Object.keys(citiesData),
        datasets: [
          {
            label: 'Top Cities',
            data: Object.values(citiesData),
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }
  hobbiesChart(hobbiesData: { [key: string]: number }): void {
    const chartData = Object.entries(hobbiesData).map(([hobby, count]) => ({
      hobby,
      count,
    }));
    new Chart('hobbiesChart', {
      type: 'bar',
      data: {
        labels: chartData.map((data) => data.hobby),
        datasets: [
          {
            label: 'Top Hobbies',
            data: chartData.map((data) => data.count),
            borderWidth: 1,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }

  femaleEngineChart(data: { [key: string]: number }): void {
    new Chart('femaleEngineChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Top Engine By Females',
            data: data,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }

  maleEngineChart(data: { [key: string]: number }): void {
    new Chart('maleEngineChart', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Top Engine By Males',
            data: data,
            borderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }
}

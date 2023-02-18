import { Injectable } from '@angular/core';
import { FormData } from 'src/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RandomFormService {
  constructor() {}

  generateRandomFormData(): Observable<FormData> {
    const options = {
      fullName: [
        'John Smith',
        'Emily Brown',
        'Daniel Johnson',
        'Sophia Davis',
        'Andrew Wilson',
      ],
      gender: ['male', 'female', 'other'],
      email: [
        'john.smith@example.com',
        'emily.brown@example.com',
        'daniel.johnson@example.com',
        'sophia.davis@example.com',
        'andrew.wilson@example.com',
      ],
      address: [
        '123 Main St.',
        '456 Elm St.',
        '789 Oak St.',
        '1011 Maple St.',
        '1213 Pine St.',
      ],
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
      country: ['USA', 'Canada', 'Mexico', 'Brazil', 'Argentina'],
      motorType: ['fuel', 'electric'],
    };
    const randomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);
    const randomBirthDate = new Date(
      +new Date('1950-01-01') +
        Math.floor(
          Math.random() * (+new Date('2005-12-31') - +new Date('1950-01-01'))
        )
    );
    const randomHobbies = ['Reading', 'Traveling', 'Swimming'];
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomSeats = Math.floor(Math.random() * 6) + 2;
    const formData: FormData = {
      fullName: options.fullName[randomIndex(options.fullName)],
      gender: options.gender[randomIndex(options.gender)],
      email: options.email[randomIndex(options.email)],
      birthDate: randomBirthDate.toISOString(),
      address: options.address[randomIndex(options.address)],
      city: options.city[randomIndex(options.city)],
      country: options.country[randomIndex(options.country)],
      hobbies: randomHobbies,
      color: randomColor,
      seats: randomSeats,
      motorType: options.motorType[randomIndex(options.motorType)],
    };
    return new Observable<FormData>((subscriber) => {
      subscriber.next(formData);
      subscriber.complete();
    }).pipe(map((formData) => formData));
  }
}

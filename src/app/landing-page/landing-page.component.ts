import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { StorageService } from '../service/storage.service';
import { DatePipe } from '@angular/common';
import { FormData } from 'src/models';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  formData: FormData = {
    fullName: '',
    gender: '',
    email: '',
    birthDate: '',
    address: '',
    city: '',
    country: '',
    hobbies: [],
    color: '#ffffff',
    seats: 2,
    motorType: '',
  };
  today: Date = new Date();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.incrementVisitorCount();
  }

  onFormSubmit(form: NgForm): void {
    if (form.valid === false) {
      this.showSnackbarMessage('Please fill out all required fields');
      return;
    }

    const formattedDate = this.datePipe.transform(
      this.formData.birthDate,
      'dd-MM-yyyy'
    );

    if (formattedDate !== null) {
      this.formData.birthDate = formattedDate;
    }

    this.storageService.storeData(this.formData);
    this.showSnackbarMessage('Form submitted successfully');
    form.resetForm();
  }

  private showSnackbarMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onBirthDateChange(): void {
    console.log('Birth Date:', this.formData.birthDate);
    console.log('today', this.today);
  }

  onAddHobby(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.formData.hobbies.push(value);
    }
    event.chipInput!.clear();
  }

  onRemoveHobby(hobby: string): void {
    const index = this.formData.hobbies.indexOf(hobby);
    if (index >= 0) {
      this.formData.hobbies.splice(index, 1);
    }
  }

  onEditHobby(hobby: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      this.onRemoveHobby(hobby);
      return;
    }
    const index = this.formData.hobbies.indexOf(hobby);
    if (index >= 0) {
      this.formData.hobbies[index] = value;
    }
  }

  onRandomFormFill(): void {
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
    this.formData = {
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
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormData } from 'src/models';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { StorageService } from '../service/storage.service';
import { DatePipe } from '@angular/common';

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
    hobbies: [
      'Reading',
      'Traveling',
      'Cooking',
      'Running',
      'Biking',
      'Swimming',
    ],
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
  onBirthDateChange() {
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

  onEditHobby(hobby: string, event: MatChipEditedEvent) {
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
    const fullNameOptions = [
      'John Smith',
      'Emily Brown',
      'Daniel Johnson',
      'Sophia Davis',
      'Andrew Wilson',
    ];
    const genderOptions = ['male', 'female', 'other'];
    const emailOptions = [
      'john.smith@example.com',
      'emily.brown@example.com',
      'daniel.johnson@example.com',
      'sophia.davis@example.com',
      'andrew.wilson@example.com',
    ];
    const addressOptions = [
      '123 Main St.',
      '456 Elm St.',
      '789 Oak St.',
      '1011 Maple St.',
      '1213 Pine St.',
    ];
    const cityOptions = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
    ];
    const countryOptions = ['USA', 'Canada', 'Mexico', 'Brazil', 'Argentina'];
    const motorTypeOptions = ['fuel', 'electric'];

    const randomFullName =
      fullNameOptions[Math.floor(Math.random() * fullNameOptions.length)];
    const randomGender =
      genderOptions[Math.floor(Math.random() * genderOptions.length)];
    const randomEmail =
      emailOptions[Math.floor(Math.random() * emailOptions.length)];
    const randomBirthDate = new Date(
      +new Date('1950-01-01') +
        Math.floor(
          Math.random() * (+new Date('2005-12-31') - +new Date('1950-01-01'))
        )
    );
    const randomAddress =
      addressOptions[Math.floor(Math.random() * addressOptions.length)];
    const randomCity =
      cityOptions[Math.floor(Math.random() * cityOptions.length)];
    const randomCountry =
      countryOptions[Math.floor(Math.random() * countryOptions.length)];
    const randomHobbies = ['Reading', 'Traveling', 'Swimming'];
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomSeats = Math.floor(Math.random() * 6) + 2;
    const randomMotorType =
      motorTypeOptions[Math.floor(Math.random() * motorTypeOptions.length)];

    this.formData.fullName = randomFullName;
    this.formData.gender = randomGender;
    this.formData.email = randomEmail;
    this.formData.birthDate = randomBirthDate.toISOString();
    this.formData.address = randomAddress;
    this.formData.city = randomCity;
    this.formData.country = randomCountry;
    this.formData.hobbies = randomHobbies;
    this.formData.color = randomColor;
    this.formData.seats = randomSeats;
    this.formData.motorType = randomMotorType;
  }
}

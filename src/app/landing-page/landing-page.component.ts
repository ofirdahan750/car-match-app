import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { StorageService } from '../services/StorageService/storage.service';
import { DatePipe } from '@angular/common';
import { FormData } from 'src/models';
import { RandomFormService } from '../services/RandomFormService/random-form.service';

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
    private storageService: StorageService,
    private randomFormService: RandomFormService
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
    this.randomFormService.generateRandomFormData().subscribe((formData) => {
      this.formData = formData;
    });
  }
}

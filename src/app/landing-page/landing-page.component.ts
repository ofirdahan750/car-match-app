import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
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
    color: '#00000',
    seats: 2,
    motorType: '',
  };
  today: Date = new Date();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {
    storageService = new StorageService();
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid) {
      this.showSnackbarMessage('Please fill out all required fields');
      return;
    }

    // Format the birthDate
    const formattedDate = this.datePipe.transform(this.formData.birthDate, 'yyyy-MM-dd');

    // Set the formatted date in the formData
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

  ngOnInit(): void {
    const storageService = new StorageService();
    storageService.incrementVisitorCount();
  }
}

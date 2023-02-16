import { Component } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormData } from 'src/models';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  formData: FormData = {
    fullName: '',
    gender: '',
    email: '',
    birthDate: '',
    address: '',
    city: '',
    country: '',
    hobbies: [],
    color: '',
    seats: 2,
    motorType: '',
  };
  today: Date = new Date();
  // colorControl = new FormControl('primary' as ThemePalette);
  constructor(private snackBar: MatSnackBar) {}

  onFormSubmit(form: NgForm): void {
    if (form.invalid) {
      this.showSnackbarMessage('Please fill out all required fields');
      return;
    }

    localStorage.setItem('formData', JSON.stringify(this.formData));
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
}

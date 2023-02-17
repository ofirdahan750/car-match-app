import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormData } from 'src/models';
import { StorageService } from '../service/storage.service';
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
    color: '',
    seats: 2,
    motorType: '',
  };
  today: Date = new Date();
  constructor(
    private snackBar: MatSnackBar,
    public storageService: StorageService
  ) {}

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
  ngOnInit(): void {
    const storageService = new StorageService();
    storageService.incrementVisitorCount();
  }
}

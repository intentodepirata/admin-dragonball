import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div
      class="bg-[#3f51b5] w-screen h-screen flex items-center justify-center"
    >
      <div class="w-96 flex flex-col">
        <mat-card appearance="outlined" class="p-5">
          <form [formGroup]="form" novalidate (ngSubmit)="onSubmit()">
            <mat-card-content>
              <h1>Login</h1>

              <mat-form-field class="w-full">
                <mat-label>Email</mat-label>
                <input
                  matInput
                  placeholder="Email"
                  autocomplete="off"
                  formControlName="email"
                />
                @if (form.get('email')?.touched &&
                form.get('email')?.hasError('email')) {

                <mat-error> Please enter a valid email address </mat-error>

                } @if (form.get('email')?.touched &&
                form.get("email")?.hasError('required')) {
                <mat-error> Email is <strong>required</strong> </mat-error>
                }
              </mat-form-field>
              <mat-form-field class="w-full">
                <mat-label>Password</mat-label>
                <input
                  matInput
                  [type]="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  formControlName="password"
                />
                <button
                  type="button"
                  matSuffix
                  mat-icon-button
                  (click)="showPassword = !showPassword"
                >
                  @if (showPassword) {
                  <mat-icon>visibility</mat-icon>
                  } @if (!showPassword) {
                  <mat-icon>visibility_off</mat-icon>
                  }
                </button>
                @if (form.get('password')?.touched &&
                form.get('password')?.hasError('minlength')) {
                <mat-error>
                  The password must be at least 6 characters long
                </mat-error>
                } @if (form.get('password')?.touched &&
                form.get('password')?.hasError('required')) {
                <mat-error> Password is <strong>required</strong> </mat-error>
                }
              </mat-form-field>
              <div class="flex w-full justify-center">
                @if (!showSpinner) {
                <button
                  mat-raised-button
                  class="w-full"
                  color="primary"
                  type="submit"
                >
                  Log In
                </button>
                } @if (showSpinner) {
                <mat-spinner />
                }
              </div>
            </mat-card-content>
          </form>
        </mat-card>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  showPassword = false;
  showSpinner = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.showSpinner = true;
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.showSpinner = false;
        this.openSnackBar('Invalid credentials', 'Close');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }
}

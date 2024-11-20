import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgetPasswordService} from "../services/forget-password.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOtpComponent {
  otpForm: FormGroup;
  isSubmitting = false;
  message: string | null = null;
  isSuccess = false;

  constructor(private fb: FormBuilder, private forgetPasswordService: ForgetPasswordService,  private router: Router) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const { email, otp } = this.otpForm.value;

    this.forgetPasswordService.verifyOtp(email, otp).subscribe({
      next: () => {
        this.isSuccess = true;
        this.message = 'OTP vérifié avec succès.';
        this.isSubmitting = false;

        // Optionnel : rediriger vers une autre page après succès
        setTimeout(() => {
          this.router.navigate(['/reset-password']);
        }, 3000);
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = err.error?.message ||     this.router.navigate(['/reset-password']);
        this.isSubmitting = false;
      }
    });
  }
}

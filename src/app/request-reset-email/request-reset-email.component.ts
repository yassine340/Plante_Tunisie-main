import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgetPasswordService} from "../services/forget-password.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-reset-email',
  templateUrl: './request-reset-email.component.html',
  styleUrls: ['./request-reset-email.component.css']
})
export class RequestResetEmailComponent {
  emailForm: FormGroup;
  isSubmitting = false;
  message: string | null = null;
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const email = this.emailForm.value.email;

    this.forgetPasswordService.verifyEmail(email).subscribe({
      next: () => {
        this.isSuccess = true;
        this.message = 'Email envoyé avec succès. Vérifiez votre boîte de réception.';
        this.isSubmitting = false;

        // Optionnel : redirection après succès
        setTimeout(() => {
          this.router.navigate(['/reset-password/verify']);
        }, 3000);
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = err.error?.message ||    this.router.navigate(['/reset-password/verify']);
        this.isSubmitting = false;
      }
    });
  }
}

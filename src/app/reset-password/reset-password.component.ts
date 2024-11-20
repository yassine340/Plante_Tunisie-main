import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgetPasswordService} from "../services/forget-password.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isSubmitting = false;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { email, password, repeatPassword } = this.resetPasswordForm.value;
    if (password !== repeatPassword) {
      this.message = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.isSubmitting = true;
    this.forgetPasswordService.resetPassword(email, password, repeatPassword).subscribe({
      next: () => {
        this.message = "Mot de passe réinitialisé avec succès.";
        this.isSubmitting = false;
        this.router.navigate(['/login']); // Redirige vers la page de connexion
      },
      error: (err) => {
        this.message = err.error?.message || this.router.navigate(['/login']);
        this.isSubmitting = false;
      },
    });
  }
}

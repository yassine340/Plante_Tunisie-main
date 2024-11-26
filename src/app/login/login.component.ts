import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../Model/MustMatch.mode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private utilisateursServices: UtilisateurService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire de login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Initialisation du formulaire d'inscription
    this.registerForm = this.fb.group(
      {
        signupUsername: ['', [Validators.required]],
        signupEmail: ['', [Validators.required, Validators.email]],
        signupPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        Validators: MustMatch('signupPassword', 'confirmPassword')
      }
    );
  }

  // Méthode pour gérer la connexion
  onLogin() {
    if (this.loginForm.invalid) {
      console.log('Form is invalid:', this.loginForm.value);
      return;
    } else {
      console.log('Submitting form with:', this.loginForm.value);

      // Appel du service pour la connexion
      this.utilisateursServices.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (data: any) => {
          console.log('Login success:', data);

          // Stocker l'ID et l'email dans localStorage
          localStorage.setItem('userId', data.id);
          localStorage.setItem('userEmail', data.email);

          // Rediriger l'utilisateur vers la page d'accueil ou une page spécifique
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Login error response:', error);
          alert('Login failed: Invalid email or password');
        }
      );
    }
  }

  // Méthode pour gérer l'inscription
  onSignUp() {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.utilisateursServices.signup(
        this.registerForm.value.signupUsername,
        this.registerForm.value.signupEmail,
        this.registerForm.value.signupPassword
      ).subscribe(
        (data: any) => {
          console.log('Signup success:', data);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          alert('Signup failed: email already exists');
        }
      );
    }
  }

  // Méthode pour basculer entre les formulaires de login et d'inscription
  toggleForm(isLoginForm: boolean) {
    this.isLogin = isLoginForm;
  }
}

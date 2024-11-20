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

  constructor(private router: Router,private utilisateursServices:UtilisateurService,private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

   this.registerForm = this.fb.group({
    signupUsername: ['', [Validators.required]],
    signupEmail: ['', [Validators.required, Validators.email]],
    signupPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    Validators:MustMatch('signupPassword', 'confirmPassword')
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      console.log('Form is invalid:', this.loginForm.value);
      return;
    } else {
      console.log('Submitting form with:', this.loginForm.value);
      this.utilisateursServices.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (data: any) => {
          console.log('Login success:', data);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Login error response:', error);
          alert('Login failed Invalid email or password');
        }
      );
    }
  }


  onSignUp() {
    if(this.registerForm.invalid){
      return;
    }else{
    this.utilisateursServices.signup(this.registerForm.value.signupUsername, this.registerForm.value.signupEmail, this.registerForm.value.signupPassword).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('Sign up failed email already exists');
      }
    );
  }
}

  toggleForm(isLoginForm: boolean) {
    this.isLogin = isLoginForm;
  }
}

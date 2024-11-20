import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private baseUrl = 'http://localhost:9094'; // Remplace par l'URL de ton backend

  constructor(private http: HttpClient) {}

  verifyEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgetPassword/verifyMail/${email}`, {});
  }
  verifyOtp(email: string, otp: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgetPassword/verify/${otp}/${email}`, {});
  }
  resetPassword(email: string, password: string, repeatPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgetPassword/changePassword/${email}`, {
      password,
      repeatPassword
    });
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http:HttpClient) { }
  public login(email:string,password:string){
    return this.http.post('http://localhost:9094/api/utilisateurs/login',{email,password});
  }
  public signup(username:string,email:string,password:string){
    return this.http.post('http://localhost:9094/api/utilisateurs/register',{username,email,password});
  }
  public getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`http://localhost:9094/api/utilisateurs/byEmail?email=${email}`);
  }
}

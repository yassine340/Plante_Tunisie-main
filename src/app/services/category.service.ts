import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Categorie } from '../Model/Categorie .mode';  

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public addCategory(nom: string, description: string): Observable<Categorie> {
    return this.http.post<Categorie>('http://localhost:9094/api/categories/ajoutCat', { nom, description });
  }

  public getAllCategories(): Observable<Categorie[]> {  // Expecting an array of Categorie
    return this.http.get<Categorie[]>('http://localhost:9094/api/categories/afficheTous');
  }

  public deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:9094/api/categories/supprimer/' + id);
  }

  public updateCategory(id: number, nom: string, description: string): Observable<Categorie> {
    return this.http.put<Categorie>('http://localhost:9094/api/categories/update/' + id, { nom, description });
  }

  public getCategoryById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>('http://localhost:9094/api/categories/byId/' + id);
  }
}

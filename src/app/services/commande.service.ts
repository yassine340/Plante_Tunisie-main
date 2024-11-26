import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemandeCommande} from "../Model/DemandeCommande.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private baseUrl = 'http://localhost:9094/api/utilisateurs'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  saveCommande(idUtilisateur: number, demandeCommande: DemandeCommande): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-commande?idUtilisateur=${idUtilisateur}`, demandeCommande);
  }
  getProduitCommandeByCommandeId(commandeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/produitCommande/${commandeId}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../Model/Cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:9094/api/utilisateurs';

  constructor(private http: HttpClient) { }

  // Ajouter un produit au panier
  public addToCart(productId: number, userId: number): Observable<Cart> {
    const url = `${this.baseUrl}/addCart?idProduit=${productId}&idUtilisateur=${userId}`;
    return this.http.post<Cart>(url, {});
  }

  // Récupérer tous les produits du panier de l'utilisateur
  public getCartItems(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/${userId}/cart`);
  }

  // Mettre à jour la quantité d'un produit dans le panier
  public updateCartQuantity(cartId: number, operation: string): Observable<void> {
    const url = `${this.baseUrl}/updateCartQuantite?sy=${operation}&cid=${cartId}`;
    return this.http.get<void>(url);
  }

  // Obtenir le nombre total d'articles dans le panier
  public getCartItemCount(userId: number): Observable<number> {
    const url = `${this.baseUrl}/${userId}/cart/count`;
    return this.http.get<number>(url);
  }

  // Supprimer un produit du panier
  public removeCartItem(cartId: number): Observable<void> {
    const url = `${this.baseUrl}/removeCart/${cartId}`;
    return this.http.delete<void>(url);
  }
}

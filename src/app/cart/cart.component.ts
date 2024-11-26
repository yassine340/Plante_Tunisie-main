import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {UtilisateurService} from "../services/utilisateur.service";
import {Cart} from "../Model/Cart.model";
import {Product} from "../Model/Product.mode";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];            // Liste des articles du panier
  totalOrderPrice: number = 0;       // Prix total de la commande
  userEmail: string | null = null;   // Email de l'utilisateur
  userId: number | null = null;      // ID de l'utilisateur

  constructor(
    private cartService: CartService,
    private utilisateurService: UtilisateurService,
    private productService: ProductService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.retrieveUserId(); // Démarrer en récupérant l'utilisateur
  }

  // Récupérer l'ID utilisateur via l'email
  retrieveUserId(): void {
    this.userEmail = localStorage.getItem('userEmail'); // Email stocké localement

    if (this.userEmail) {
      this.utilisateurService.getUserByEmail(this.userEmail).subscribe({
        next: (user) => {
          this.userId = user.id; // Stocker l'ID utilisateur
          this.loadCart();       // Charger le panier
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", err);
        }
      });
    } else {
      console.error("Aucun utilisateur connecté.");
    }
  }

  // Charger les articles du panier
  loadCart(): void {
    if (this.userId) {
      this.cartService.getCartItems(this.userId).subscribe({
        next: (cartItems) => {
          this.cartItems = cartItems;
          this.totalOrderPrice = cartItems.reduce((sum, item) => sum + item.prixTotal, 0);

          // Charger les images pour chaque produit
          this.cartItems.forEach((item) => {
            this.loadProductImage(item.produit); // Assurez-vous que l'objet `product` existe dans `Cart`
          });
        },
        error: (err) => {
          console.error("Erreur lors de la récupération du panier :", err);
        }
      });
    } else {
      console.error("Impossible de charger le panier : ID utilisateur introuvable.");
    }
  }

  // Charger l'image du produit
  loadProductImage(product: { id: number; nom: string; prix: number; image: string }): void {
    this.productService.getProductImage(product.id).subscribe({
      next: (imageData: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          product.image = reader.result as string; // Convertir le Blob en base64
        };
        reader.readAsDataURL(imageData);
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'image du produit :", err);
      }
    });
  }

  // Mettre à jour la quantité d'un produit dans le panier
  updateQuantity(cartId: number, action: string): void {
    this.cartService.updateCartQuantity(cartId, action).subscribe({
      next: () => {
        this.loadCart(); // Recharger le panier après la mise à jour
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de la quantité :", err);
      }
    });
  }

  // Supprimer un article du panier
  removeCartItem(cartId: number): void {
    this.cartService.removeCartItem(cartId).subscribe({
      next: () => {
        this.loadCart(); // Recharger le panier après suppression
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de l'article du panier :", err);
      }
    });
  }
  // Méthode pour naviguer vers la page de commande
  goToCommande(): void {
    this.router.navigate(['/commande'], { queryParams: { total: this.totalOrderPrice } });
  }
}


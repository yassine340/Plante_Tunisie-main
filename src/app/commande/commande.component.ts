import {Component, OnInit} from '@angular/core';
import {CommandeService} from "../services/commande.service";
import {DemandeCommande} from "../Model/DemandeCommande.model";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  demandeCommande: DemandeCommande = {
    prenom: '',
    nom: '',
    email: '',
    numtel: '',
    adresse: '',
    city: '',
    state: '',
    pincode: '',
    typEPayment: '',
  };

  userId: number | null = null;
  totalOrderPrice: number = 0; // Pour stocker le prix total

  constructor(
    private commandeService: CommandeService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      this.loadCartTotal();
    }
  }

  // Charger le prix total depuis le panier
  loadCartTotal(): void {
    if (this.userId) {
      this.cartService.getCartItems(this.userId).subscribe({
        next: (cartItems) => {
          this.totalOrderPrice = cartItems.reduce((sum, item) => sum + item.prixTotal, 0);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du total du panier :', err);
        },
      });
    } else {
      console.error('Utilisateur non connecté pour charger le panier.');
    }
  }

  submitCommande(formData: DemandeCommande): void {
    if (this.userId) {
      this.commandeService.saveCommande(this.userId, formData).subscribe({
        next: (response) => {
          // Afficher une alerte de confirmation
          alert('Félicitations, votre commande a été confirmée!');
          // Optionnel : Rediriger vers une autre page après la confirmation
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error("Félicitations, votre commande a été confirmée!", err);
          alert('Félicitations, votre commande a été confirmée!');
        },
      });
    } else {
      alert('Utilisateur non connecté');
    }
  }
  // Méthode pour naviguer vers la page d'accueil
  continueShopping(): void {
    this.router.navigate(['/home']);
  }
}

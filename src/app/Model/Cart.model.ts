export interface Cart {
  id: number;
  quantite: number;
  prixTotal: number;
  produit: {
    id: number;
    nom: string;
    prix: number;
    image: string;
  };
  utilisateur: {
    id: number;
    email: string;
  };
  totalOrderPrice?: number; // Optionnel si vous gérez le total de la commande côté client
}

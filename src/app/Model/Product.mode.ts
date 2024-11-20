export class Product {
    id?: number;
    nom: string;
    description: string;
    prix: number;
    categorie: string;
    image: string;
    quantite: number;
    categorie_id: number;
  
    constructor(nom: string, description: string, prix: number, categorie: string, image: string, quantite: number, categorie_id: number) {
      this.nom = nom;
      this.description = description;
      this.prix = prix;
      this.categorie = categorie;
      this.image = image;
        this.quantite = quantite;
        this.categorie_id = categorie_id;
    }
  }
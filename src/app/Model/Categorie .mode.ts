export class Categorie {
    id?: number;  
    nom: string;
    description: string;
  
    constructor(nom: string, description: string) {
      this.nom = nom;
      this.description = description;
    }
  }
  
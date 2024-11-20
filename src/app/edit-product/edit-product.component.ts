import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../Model/Product.mode';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = {
    id: 0,
    nom: '',
    description: '',
    prix: 0,
    quantite: 0,
    image: '',
    categorie_id: 0, // Set default value as 0
    categorie: ''
  };

  categories = [
    { label: 'Electronics', value: 1 },
    { label: 'Clothing', value: 2 },
    { label: 'Home Appliances', value: 3 }
  ];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.product = {
          ...data,
          categorie_id: data.categorie_id ?? 0 
        };
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  
}

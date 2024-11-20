import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Product} from "../Model/Product.mode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.products.forEach(product => {
          this.loadProductImage(product);
        });
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  loadProductImage(product: Product): void {
    this.productService.getProductImage(product.id).subscribe(
      (imageData: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          product.image = reader.result as string;
        };
        reader.readAsDataURL(imageData);
      },
      (error) => {
        console.error('Error loading product image:', error);
      }
    );
  }
}

/**@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log('Products fetched', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}**/

import { Component,OnInit } from '@angular/core';
import { Product } from '../Model/Product.mode';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.products.forEach(product => {
        this.loadProductImage(product);
      });
    });
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

  deleteProduct(product: Product): void {
    if (product.id !== undefined && product.id !== null) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            this.products = this.products.filter(p => p.id !== product.id);
            console.log('Product deleted successfully');
          },
          (error) => {
            console.error('Error deleting product:', error);
          }
        );
      }
    } else {
      console.error('Product ID is undefined');
    }
  }
}

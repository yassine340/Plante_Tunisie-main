import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Categorie } from '../Model/Categorie .mode'; 
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-aff-category',
  templateUrl: './aff-category.component.html',
  styleUrls: ['./aff-category.component.css']
})
export class AffCategoryComponent implements OnInit {
editCategory(_t15: Categorie) {
throw new Error('Method not implemented.');
}
  categories: Categorie[] = [];  
  loading: boolean = true;

  constructor(private categoryService: CategoryService,private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: Categorie[]) => {  
        this.categories = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
        this.loading = false;
      }
    );
  }
  deleteCategory(category: Categorie) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(category.id!).subscribe(
        (response: any) => {
          alert('Category deleted successfully');
          this.categories = this.categories.filter(cat => cat.id !== category.id);
        },
        (error: any) => {
          alert('Error deleting category');
        }
    );
  }
  }  
  addCategory() {
    this.router.navigate(['/add-category']);
  }
}

// edit-category.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CategoryService } from '../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../Model/Categorie .mode'; 

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm!: FormGroup; 
  categoryId!: number; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private categoryService: CategoryService, 
    private fb: FormBuilder 
  ) {}

  ngOnInit(): void {
    
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.categoryForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getCategory();
  }
  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (data: Categorie) => {
        this.categoryForm.patchValue({
          nom: data.nom,
          description: data.description
        });
      },
      (error) => {
        console.error('Error fetching category', error);
      }
    );
  }
  submit() {
    if (this.categoryForm.valid) {
      const updatedCategory = this.categoryForm.value;
      this.categoryService.updateCategory(this.categoryId, updatedCategory.nom, updatedCategory.description).subscribe(
        () => {
          console.log('Category updated successfully');
          this.router.navigate(['/aff-category']);
        },
        (error) => {
          console.error('Error updating category', error);
        }
      );
    }
  }
}

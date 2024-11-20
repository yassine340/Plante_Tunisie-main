import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.categoryForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  submitCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value.nom, this.categoryForm.value.description).subscribe(
        (data: any) => {
          alert('Category added successfully');
          this.categoryForm.reset();
        },
        (error: any) => {
          alert('Error adding category');
          this.categoryForm.reset();
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

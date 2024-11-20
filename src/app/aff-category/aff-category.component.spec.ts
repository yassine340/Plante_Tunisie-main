import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffCategoryComponent } from './aff-category.component';

describe('AffCategoryComponent', () => {
  let component: AffCategoryComponent;
  let fixture: ComponentFixture<AffCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffCategoryComponent]
    });
    fixture = TestBed.createComponent(AffCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

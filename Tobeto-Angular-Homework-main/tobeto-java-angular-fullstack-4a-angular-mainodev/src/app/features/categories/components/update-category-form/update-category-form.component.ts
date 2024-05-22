import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../../models/category';
import { CategoryItem } from '../../models/category-item';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './update-category-form.component.html',
  styleUrl: './update-category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCategoryFormComponent {
selectedCategoryId: any;
categoryItem!:CategoryItem
categoryForm!: FormGroup;

constructor(private formBuilder: FormBuilder ,private categoryService: CategoriesService,private route: ActivatedRoute, private router: Router,category:Category) {}

  ngOnInit(): void {
    this.getCategoryIdFromRoute();
  }

  getCategoryIdFromRoute() {
    this.route.params.subscribe((routeParams) => {
      const selectedCategoryId: number | undefined = Number(routeParams['categoryId']);

      // false, 0, null, undefined, NaN, '' => false
      if (!selectedCategoryId) {
        this.router.navigate(['/']);
        throw new Error('Category ID is invalid.');
      }
     // this.categoryItem = <CategoryItem>this.categoryService.getById();
      this.selectedCategoryId = selectedCategoryId;
    });
  }
updateDetails() {
throw new Error('Method not implemented.');
}
initializeForm() {
  this.categoryForm = this.formBuilder.group({
    name: [this.categoryItem.name, Validators.required],
    description: [this.categoryItem.description, Validators.required]
  });
}
updateCategory() {
/*   if (this.categoryForm.valid) {
    const updatedCategory: CategoryItem = {
      id:this.categoryForm.value.id,
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };

    this.categoryService.updateCategory().subscribe(() => {
    });
  } */
}
}

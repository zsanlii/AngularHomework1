import { Routes } from '@angular/router';
import { UpdateCategoryFormComponent } from './update-category-form.component';

export const updateCategory: Routes = [
  {
    path: 'updatecategory/:categoryId',
    component: UpdateCategoryFormComponent,
  },
];

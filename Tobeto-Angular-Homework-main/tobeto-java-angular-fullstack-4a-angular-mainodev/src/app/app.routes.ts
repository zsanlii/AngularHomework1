import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { authRoutes } from './routes/auth/auth.routes';
import { productsRoutes } from './routes/products/products.routes';
import { categoriesRoutes } from './routes/categories/categories.routes';
import { categoryListRoutes } from './features/categories/components/category-list/categorylist.routes';
import { addCategoryForm } from './features/categories/components/add-category-form/addcategory.routes';
import { updateCategory } from './features/categories/components/update-category-form/updatecategory.routes';
import { productListRoutes } from './features/products/components/product-list/productlist.routes';

export const routes: Routes = [
  {
    path: '', // Mevcut route, belirtilen path ile eşleştiğinde
    component: HomePageComponent, // İlgili component'i, AppComponent'den başlayarak ilk karşılaştığı router-outlet'e yerleştirir.
  },

  ...authRoutes, // ... spread operatörü ile authRoutes array'ini routes array'ine ekliyoruz.
  ...productsRoutes,
  ...categoriesRoutes,
  ...categoryListRoutes,
  ...addCategoryForm,
  ...updateCategory,
  ...productListRoutes
];

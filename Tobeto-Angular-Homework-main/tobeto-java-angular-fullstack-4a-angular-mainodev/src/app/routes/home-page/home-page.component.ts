import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryListGroupComponent } from '../../features/categories/components/category-list-group/category-list-group.component';
import { ProductCardListComponent } from '../../features/products/components/product-card-list/product-card-list.component';
import { CategoryListItem } from '../../features/categories/models/category-list-item';
import { ProductListItem } from '../../features/products/models/product-list-item';
import { SharedModule } from '../../shared/shared.module';
import { IfNotDirective } from '../../shared/directives/if-not.directive';

@Component({
  standalone: true,
  imports: [
    // CommonModule, // SharedModule içerisinde olduğu için burada tekrar eklemeye gerek yok.
    RouterModule,
    // BasicLayoutComponent,
    SharedModule,
    CategoryListGroupComponent,
    ProductCardListComponent,
    IfNotDirective,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {


  seletectedCategoryId: number | null = null;

  isOldUser: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private change:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.categoryIdFromRoute();
    this.detectNewUser();
  }

  detectNewUser() {
    let isOldUser = Boolean(localStorage.getItem('oldUser'));
    if (!isOldUser) {
      localStorage.setItem('oldUser', 'true');
      return;
    }
    setTimeout(() => {
      this.isOldUser = isOldUser;
      this.change.markForCheck();
    }, 5000);
  }

  categoryIdFromRoute() {
    this.route.queryParams
      .subscribe((queryParams) => {
        const categoryId: number | undefined = Number(queryParams['category']);
        if (categoryId) this.seletectedCategoryId = categoryId;
      })
      .unsubscribe();
  }

  onChangeSelectCategory(event: { selectedCategory: CategoryListItem | null }) {
    this.seletectedCategoryId = event.selectedCategory?.id || null;

    const queryParams = {
      category: this.seletectedCategoryId,
    };
    this.router.navigate([], {
      queryParams,
    });
  }

  onViewProduct(event: ProductListItem) {
    this.router.navigate(['products', event.id]); // localhost:4200/products/5
  }
  categoryPage() {
  this.router.navigate(['categorylist'])
    }
    productPage() {
      this.router.navigate(['productlist'])
      }
 
}

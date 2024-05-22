import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoriesService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
  
   this.loadCategories();
   
  }

  loadCategories() {
    this.categoryService.getList().subscribe((data: any) => {
      this.categories = data; 
    });
  }
  addCategory() {
   this.router.navigate(['addCategory'])
    }
    deleteCategory(categoryId: number) {
      if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          this.router.navigate(['categorylist']); 
        });
      }
    }
    updateCategory(categoryId: number) {
     this.router.navigate(['updatecategory',categoryId]); 
    
    }

}

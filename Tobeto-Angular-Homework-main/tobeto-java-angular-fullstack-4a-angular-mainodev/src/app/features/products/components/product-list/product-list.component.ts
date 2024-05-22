import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  products:any[]=[];

  constructor(private productService: ProductsService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
  
    this.loadProducts();
    
   }
  loadProducts() {
    this.productService.getListProduct().subscribe((data: any) => {
      this.products = data; 
    });
  }
addProduct() {
  this.router.navigate(['addCategory'])
}

deleteProduct(productId: number) {
  if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.router.navigate(['productlist']); 
    });
  }
}
updateProduct(arg0: any) {
throw new Error('Method not implemented.');
}
}

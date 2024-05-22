import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductListItem } from '../../models/product-list-item';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsService } from '../../services/products.service';
import { VatPipe } from '../../pipes/vat.pipe';

@Component({
  selector: 'app-product-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, VatPipe],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardListComponent implements OnInit, OnChanges {
  @Input() filterByCategoryId: number | null = null;
  @Output() viewProduct = new EventEmitter<ProductListItem>();

  productList!: ProductListItem[];

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ngOnInit: Angular bileşeninin yerleştiridiğinde çalışan bir yaşam döngüsü olayıdır.
    this.getProductList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ngOnChanges: Değişiklik algılandığında çalışan bir Angular yaşam döngüsü olayıdır.
    if (
      changes['filterByCategoryId'] &&
      changes['filterByCategoryId'].previousValue !==
        changes['filterByCategoryId'].currentValue
    )
      this.getProductList();
  }

  getProductList() {
    this.productsService.getList(this.filterByCategoryId).subscribe({
      next: (productList) => {
        this.productList = productList;
        this.change.markForCheck();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  onViewProduct(product: ProductListItem) {
    this.viewProduct.emit(product);
  }
}

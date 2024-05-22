import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { ProductListItem } from '../models/product-list-item';
import { ProductDetails } from '../models/product-details';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly apiControllerUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getList(filterByCategoryId: number | null): Observable<ProductListItem[]> {
    let queryParams: any = {};
    if (filterByCategoryId) {
      queryParams.categoryId = filterByCategoryId.toString();
    }

    return this.http
      .get<ProductListItem[]>(this.apiControllerUrl, {
        params: queryParams,
      })
      .pipe(
        // pipe: Bir veya daha fazla operatörü birbirine bağlar. Böylece Observable yapıların davranışını değiştirilebilir. https://rxjs.dev/api/operators/

        map((data) => {
          for (const product of data) {
            product.imageUrl = 'https://via.placeholder.com/500';
          }
          return data;
          // map: Bir veri akıştan başka bir veri akışa dönüşüm yapar. https://rxjs.dev/api/operators/map
        })
      );

    const subject = new Subject<ProductListItem[]>();
    // Subject: Veri akışını olduğunda, hata olduğunda ve tamamlandığında gözlemleyenlere haber veren bir yapıdır.
    // BehaviorSubject: Subject'in bir türüdür. Ancak, bir BehaviorSubject, abone olmadan önceki en son değeri saklar ve yeni abonelere bu değeri hemen gönderir.

    this.http.get<ProductListItem[]>(this.apiControllerUrl).subscribe({
      next: (response) => {
        for (const product of response) {
          product.imageUrl = 'https://via.placeholder.com/500';
        }
        console.log('ProductService:', response);

        subject.next(response);
      },
      error: (error) => {
        subject.error(error);
      },
      complete: () => {
        subject.complete();
      },
    });

    return subject.asObservable();
  }

  getById(id: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.apiControllerUrl}/${id}`).pipe(
      map((data) => {
        data.imageUrl = 'https://via.placeholder.com/500';
        return data;
      })
    );
  }
  getListProduct() : Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(this.apiControllerUrl);
  }
  deleteProduct(productId: number): Observable<unknown> {
    return this.http.delete(this.apiControllerUrl + '/' + productId);
  }
}

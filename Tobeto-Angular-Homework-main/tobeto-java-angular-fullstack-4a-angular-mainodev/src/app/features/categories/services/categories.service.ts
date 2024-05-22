import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryListItem } from '../models/category-list-item';
import { AddCategory } from '../models/add-category';
import { AddedCategory } from '../models/added-category';
import { CategoryItem } from '../models/category-item';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  
  deleteCategory(categoryId: number): Observable<unknown> {
    return this.http.delete(this.apiControllerUrl + '/' + categoryId);
  }
  private apiControllerUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getList(): Observable<CategoryListItem[]> {
    return this.http.get<CategoryListItem[]>(this.apiControllerUrl);
  }

  add(category: AddCategory): Observable<AddedCategory> {
    return this.http.post<AddedCategory>(this.apiControllerUrl, category);
  }
  updateCategory() {
    throw new Error('Method not implemented.');
  }
  getById(categoryId: number):Observable<CategoryItem>{
    return this.http.get<CategoryItem>(this.apiControllerUrl + '/' + categoryId)
  }
}

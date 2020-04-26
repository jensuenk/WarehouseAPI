import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct> {
      return this.http.get<IProduct>("https://192.168.0.158:45455/api/v1/product")
  }
  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>("https://192.168.0.158:45455/api/v1/product/id=" + id)
  }

  product: IProduct;
}

export interface IProduct {
  id: number;
  number: string;
  name: string;
  description: string;
  location: string;
  price: number;
}

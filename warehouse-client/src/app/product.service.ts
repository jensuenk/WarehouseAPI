import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = "https://192.168.0.158:45455/api/v1/product/";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct> {
      return this.http.get<IProduct>(this.url)
  }
  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.url + "id=" + id)
  }

  createProduct(product: IProduct) {
      let body = JSON.stringify(product);
      return this.http.post(this.url, body, httpOptions);
    }

  updateProduct(product: IProduct) {
      let body = JSON.stringify(product);
      return this.http.put(this.url + product.id, body, httpOptions);
  }

  deleteProduct(product: IProduct) {
      return this.http.delete(this.url + product.id);
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

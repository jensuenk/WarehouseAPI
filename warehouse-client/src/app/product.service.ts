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
  private url = "https://192.168.0.158:45455/api/v1/product";

  constructor(private http: HttpClient) { }

  getProducts(args: string): Observable<IProduct> {
    console.log(this.url + args);
    return this.http.get<IProduct>(this.url + args)
  }

  createProduct(product: IProduct) {
    let body = JSON.stringify(product);
    delete body['id'];
    console.log(product)
    return this.http.post(this.url, body, httpOptions);
  }

  updateProduct(product: IProduct) {
    let body = JSON.stringify(product);
    delete body['id'];
    return this.http.put(this.url, body, httpOptions);
  }

  deleteProduct(product: IProduct) {
    return this.http.delete(this.url + "/" + product.id);
  }

  product: IProduct;
}

export interface IProduct {
  id: number,
  number: string,
  name: string,
  description: string,
  location: string,
  price: number
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = "https://192.168.0.158:45455/api/v1/product";

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getProducts(args: string): Observable<IProduct> {
    console.log(this.url + args);
    return this.http.get<IProduct>(this.url + args, {
      headers: {
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    })
  }

  getProductById(id: string): Observable<IProduct> {
    console.log(this.url + "/" + id);
    return this.http.get<IProduct>(this.url + "/" + id, {
      headers: {
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    })
  }

  createProduct(product: IProduct) {
    let body = JSON.stringify(product);
    delete body['id'];
    console.log(product)
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    });
  }

  updateProduct(product: IProduct) {
    let body = JSON.stringify(product);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    });
  }

  deleteProduct(product: IProduct) {
    return this.http.delete(this.url + "/" + product.id, {
      headers: {
        'Authorization': "Bearer " + this.cookie.get('idToken')
      }
    })
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
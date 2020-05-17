import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private url = "https://192.168.0.158:45455/api/v1/order";

  constructor(private http: HttpClient) { }

  getOrders(args: string): Observable<IOrder> {
    console.log(this.url + args);
    return this.http.get<IOrder>(this.url + args)
  }

  createOrder(order: IOrder) {
    let body = JSON.stringify(order);
    delete body['id'];
    return this.http.post(this.url, body, httpOptions);
  }

  updateOrder(order: IOrder) {
    let body = JSON.stringify(order);
    delete body['id'];
    return this.http.put(this.url, body, httpOptions);
  }

  deleteOrder(order: IOrder) {
    return this.http.delete(this.url + "/" + order.id);
  }

  order: IOrder;
}

export interface IOrder {
  id: number,
  user: IUser,
  date: Date
}
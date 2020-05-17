import { Component, OnInit } from '@angular/core';
import { IOrder, OrderService } from '../order.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders : IOrder;
  errorMessage: string
  successMessage: string;

  constructor(private svc : OrderService) { }

  ngOnInit() {
    this.getOrders();
    this.errorMessage = "";
    this.successMessage = "";
  }

  getOrders(urlArgs: string = "") {
    this.svc.getOrders(urlArgs).subscribe(
        result => {
          this.orders = result
          return true;
        },
        error => {
          console.error("Error while retreiving orders!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }


  createOrder(user, date) {
    let newOrder: IOrder = {
      id: 0,
      // get user by id
      user: user,
      date: date
    }
    this.svc.createOrder(newOrder).subscribe(
        data => {
          // refresh the list
          this.getOrders();
          this.showSuccess("Successfully created a new order!")
          return true;
        },
        error => {
          console.error("Error creating order!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
    
  updateOrder(updatedOrder) {
    this.svc.updateOrder(updatedOrder).subscribe(
        data => {
          // refresh the list
          this.getOrders();
          this.showSuccess("Successfully updated the order!")
          return true;
        },
        error => {
          console.error("Error saving order!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
    
  deleteOrder(order) {
    this.svc.deleteOrder(order).subscribe(
        data => {
          // refresh the list
          this.getOrders();
          this.showSuccess("Successfully deleted the order!")
          return true;
        },
        error => {
          console.error("Error deleting order!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = "";
  }
  showSuccess(message: string) {
    this.errorMessage = "";
    this.successMessage = message;
  }
}
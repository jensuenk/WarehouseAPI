import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../product.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : IProduct;
  errorMessage: string
  successMessage: string;

  constructor(private svc : ProductService) { }

  ngOnInit() {
    this.getProducts();
    this.errorMessage = "";
    this.successMessage = "";
  }

  getProducts(urlArgs: string = "") {
    this.svc.getProducts(urlArgs).subscribe(
        result => {
          this.products = result
          return true;
        },
        error => {
          console.error("Error while retreiving products!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }


  createProduct(number, name, description, location, price) {
    let newProduct: IProduct = {
      id: 0,
      number: number,
      name: name,
      description: description,
      location: location,
      price: price
    }
    this.svc.createProduct(newProduct).subscribe(
        data => {
          // refresh the list
          this.getProducts();
          this.showSuccess("Successfully created a new product!")
          return true;
        },
        error => {
          console.error("Error creating product!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
    
  updateProduct(updatedProduct) {
    this.svc.updateProduct(updatedProduct).subscribe(
        data => {
          // refresh the list
          this.getProducts();
          this.showSuccess("Successfully updated the product!")
          return true;
        },
        error => {
          console.error("Error saving product!");
          this.showError(error.message)
          return Observable.throw(error);
        }
    );
  }
    
  deleteProduct(product) {
    this.svc.deleteProduct(product).subscribe(
        data => {
          // refresh the list
          this.getProducts();
          this.showSuccess("Successfully deleted the product!")
          return true;
        },
        error => {
          console.error("Error deleting product!");
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
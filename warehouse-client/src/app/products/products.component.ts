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
  successfulSave: boolean;
  successMessage: string;
  errors: string[];


  constructor(private svc : ProductService) { }

  ngOnInit() {
    this.getProducts();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  getProducts(urlArgs: string = "") {
    this.svc.getProducts(urlArgs).subscribe(
        result => {
          this.errors = [];
          this.products = result
          return true;
        },
        error => {
          console.error("Error while retreiving products!");
          this.showError(error.message)
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
          this.errors = [];
          // refresh the list
          this.getProducts();
          this.showSuccess("Successfully created a new product!")
          this.successfulSave = true
          return true;
        },
        error => {
          this.errors = [];
          console.error("Error saving product!");
          this.successfulSave = false
          if (error.status === 400) {
            const validationErrors = error.error;
            Object.keys(validationErrors).forEach(prop => {
              console.log(validationErrors[prop])
              this.errors.push(validationErrors[prop])
            });
          }
        }
    );
  }
    
  updateProduct(updatedProduct) {
    this.svc.updateProduct(updatedProduct).subscribe(
        data => {
          this.errors = [];
          // refresh the list
          this.getProducts();
          this.showSuccess("Successfully updated the product!")
          this.successfulSave = true
          return true;
        },
        error => {
          this.errors = [];
          console.error("Error saving product!");
          this.successfulSave = false
          if (error.status === 400) {
            const validationErrors = error.error;
            Object.keys(validationErrors).forEach(prop => {
              console.log(validationErrors[prop])
              this.errors.push(validationErrors[prop])
            });
          }
        }
    );
  }
    
  deleteProduct(product) {
    this.svc.deleteProduct(product).subscribe(
        data => {
          this.errors = [];
          // refresh the list
          this.getProducts();
          this.showSuccess("Successfully deleted the product!")
          return true;
        },
        error => {
          console.error("Error deleting product!");
          this.showError(error.message)
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
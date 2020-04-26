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

  constructor(private svc : ProductService) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.svc.getProducts().subscribe(
        result => {
          this.products = result
          return true;
        },
        error => {
          console.error("Error while retreiving products!");
          return Observable.throw(error);
        }
    );
  }

  createProduct(id, number, name, description, location, price) {
    let newProduct: IProduct = {
      id: id,
      number: number,
      name: name,
      description: description,
      location: location,
      price: price,
    }
    this.svc.createProduct(newProduct).subscribe(
        data => {
          // refresh the list
          this.getProducts();
          return true;
        },
        error => {
          console.error("Error creating product!");
          return Observable.throw(error);
        }
    );
  }
    
  updateProduct(product) {
    this.svc.updateProduct(product).subscribe(
        data => {
          // refresh the list
          this.getProducts();
          return true;
        },
        error => {
          console.error("Error saving product!");
          return Observable.throw(error);
        }
    );
  }
    
  deleteProduct(product) {
    this.svc.deleteProduct(product).subscribe(
        data => {
          // refresh the list
          this.getProducts();
          return true;
        },
        error => {
          console.error("Error deleting product!");
          return Observable.throw(error);
        }
    );
  }
}

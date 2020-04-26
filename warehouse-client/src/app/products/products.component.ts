import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : IProduct;

  constructor(private svc : ProductService) { }

  ngOnInit() {
    this.svc.getProducts()
      .subscribe(result => this.products = result);
    console.log(this.products)
  }

}

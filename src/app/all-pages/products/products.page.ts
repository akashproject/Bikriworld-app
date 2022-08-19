import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products : any = [];
  brand_id : string;
  loc : any;
  constructor(public api: ApiService,private location:Location,public router: Router) { }

  ngOnInit() {
    this.loc = this.location.getState();
    this.brand_id = this.loc.brand_id;
    this.getProducts(this.brand_id)
  }

  getProducts(brand_id){
    let param = {
      "brand_id":brand_id,
      "category_id":"2"
    }

    this.api.post('api/products', param).subscribe((data: any) => {
      this.products = data;
    }, error => {

    });
  }

}

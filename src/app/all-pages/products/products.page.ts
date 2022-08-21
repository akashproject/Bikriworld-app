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
  loc : any;
  constructor(public api: ApiService,private location:Location,public router: Router) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){    
    let param = {
      "brand_id":localStorage.getItem("brand_id"),
      "category_id":localStorage.getItem("category_id")
    }

    this.api.post('api/products', param).subscribe((data: any) => {
      this.products = data;
    }, error => {

    });
  }

  viewProduct(product_id){
    this.router.navigate(['/view-product'], {state : {product_id :product_id}});
  }

  goToSearch(key){
    this.router.navigate(['/search'], {state : {key :key}});
  }

}

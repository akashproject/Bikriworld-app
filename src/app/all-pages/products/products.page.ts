import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products : any = [];
  loc : any;
  mediaUrl :any;
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { 
    this.mediaUrl = this.api.mediaURL;
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){   
    this.util.presentLoading(); 
    let param = {
      "brand_id":localStorage.getItem("brand_id"),
      "category_id":localStorage.getItem("category_id")
    }

    this.api.post('api/products', param).subscribe((data: any) => {
      this.products = data;
      this.util.hideLoading();
    }, error => {
    });
  }

  viewProduct(product_id){
    localStorage.setItem("product_id", product_id);
    this.router.navigate(['/view-product']);
  }

  goToSearch(key){
    this.router.navigate(['/search'], {state : {key :key}});
  }

}

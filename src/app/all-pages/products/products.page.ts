import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products : any = [];
  loc : any;
  mediaUrl :any;
  page:any = 1;
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
  ionViewWillEnter(){
    localStorage.removeItem("variation_type")
  }

  getProducts(){   
    //this.util.presentLoading(); 
    let param = {
      "brand_id":localStorage.getItem("brand_id"),
      "category_id":localStorage.getItem("category_id")
    }

    this.api.post('api/products?page='+this.page, param).subscribe((data: any) => {
      for (let element of data) {
        console.log(element);
        this.products.push(element);
      }
      
      console.log(this.products);
      
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

  onIonInfinite(ev) {
    this.page = this.page + 1
    this.getProducts();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}

import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  product : any = []
  variants : any = {}
  maxPrice : string;
  loc : any;
  category_id = localStorage.getItem("category_id")
  mediaUrl :any;
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private modalCtrl: ModalController
  ) {
    this.mediaUrl = this.api.mediaURL;
    this.viewProduct();
   }

  ngOnInit() {
   
  }

  viewProduct(){    
    this.util.presentLoading();
    this.api.get('api/product/'+localStorage.getItem("product_id")).subscribe((data: any) => {
      this.product = data;
      this.variants = JSON.parse(data.variant);
      this.maxPrice = data.max_price
      if(!this.variants){
        localStorage.setItem("veriation_price", data.max_price);
      }
      
      this.util.hideLoading();
    });
  }

  setVariant(variant){
    let variation_type = variant.ram +' | '+ variant.storage
    localStorage.setItem("variation_type", variation_type);
    localStorage.setItem("veriation_price", variant.price);
    this.maxPrice = variant.price;
  }

  back(){
    localStorage.removeItem("variation_type")
  }

}

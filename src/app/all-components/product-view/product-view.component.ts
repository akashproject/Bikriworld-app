import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { AlertController ,ModalController } from '@ionic/angular';
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
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private modalCtrl: ModalController
  ) {
    this.loc = this.location.getState();
    localStorage.setItem("product_id", JSON.stringify(this.loc.product_id));
    this.viewProduct(this.loc.product_id);
   }

  ngOnInit() {
   
  }

  viewProduct(product_id){    
    this.util.presentLoading();
    this.api.get('api/product/'+localStorage.getItem("product_id")).subscribe((data: any) => {
      this.product = data;
      this.variants = JSON.parse(data.variant);
      this.maxPrice = data.max_price
      this.util.hideLoading();
    });
  }

  setVariant(variant){
    let variation_type = variant.ram +' | '+ variant.storage
    localStorage.setItem("variation_type", variation_type);
    localStorage.setItem("veriation_price", variant.price);
    this.maxPrice = variant.price;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}

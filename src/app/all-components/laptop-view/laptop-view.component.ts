import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { ModalController } from '@ionic/angular';
import { ConfigurationComponent } from '../configuration/configuration.component';
@Component({
  selector: 'app-laptop-view',
  templateUrl: './laptop-view.component.html',
  styleUrls: ['./laptop-view.component.scss'],
})
export class LaptopViewComponent implements OnInit {

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
    this.api.get('api/product/'+product_id).subscribe((data: any) => {
      this.product = data;
      this.variants = JSON.parse(data.variant);
      this.maxPrice = data.max_price
      this.util.hideLoading();
    });
  }

  setVariant(variant){
    let variation_type = variant.ram +' | '+ variant.storage
    localStorage.setItem("variant", JSON.stringify(variant));
    localStorage.setItem("variation_type", variation_type);
    localStorage.setItem("veriation_price", variant.price);
    this.maxPrice = variant.price;
  }

  async seeConfiguration (){
    
    const modal = await this.modalCtrl.create({
      component: ConfigurationComponent,
      componentProps: { product_id: this.product.id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }
}

import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { AlertController ,ModalController } from '@ionic/angular';
import { VehicleConfigurationPage } from '../../all-pages/vehicle-configuration/vehicle-configuration.page';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss'],
})
export class VehicleViewComponent implements OnInit {
  product : any = []
  variants : any = {}
  maxPrice : string;
  loc : any;
  category_id = localStorage.getItem("category_id")
  variation_type : any;
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private modalCtrl: ModalController
  ) {
    this.viewProduct();
   }

  ngOnInit() {
    //this.variation_type = (localStorage.getItem("variation_type"))?localStorage.getItem("variation_type"):'';
  }

  viewProduct(){    
    this.util.presentLoading();
    this.api.get('api/product/'+localStorage.getItem("product_id")).subscribe((data: any) => {
      this.product = data;
      this.variants = JSON.parse(data.variant);
      this.maxPrice = data.max_price
      this.util.hideLoading();
    });
  }

  async seeConfiguration (){
    
    const modal = await this.modalCtrl.create({
      component: VehicleConfigurationPage,
      componentProps: { product_id: this.product.id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.variation_type = (localStorage.getItem("variation_type"))?localStorage.getItem("variation_type"):'';
    }
  }

}

import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { ModalController } from '@ionic/angular';
import { ConfigurationPage } from '../../all-pages/configuration/configuration.page';
import { Platform } from '@ionic/angular';
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
  variation_type : any;
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {
    this.viewProduct();
    this.platform.backButton.subscribeWithPriority(10, () => {
      localStorage.removeItem("variation_type")
      this.router.navigate(['/products']);
    });
   }

  ngOnInit() {
    this.variation_type = (localStorage.getItem("variation_type"))?localStorage.getItem("variation_type"):'';
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
      component: ConfigurationPage,
      componentProps: { product_id: this.product.id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.variation_type = (localStorage.getItem("variation_type"))?localStorage.getItem("variation_type"):'';
      this.router.navigate(['/question']);
    }
  }

  back(){
    localStorage.removeItem("variation_type")
  }
}

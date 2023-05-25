import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { AlertController ,ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/all-services/util.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.page.html',
  styleUrls: ['./order-placed.page.scss'],
})
export class OrderPlacedPage implements OnInit {
  product : any = {};
  order : any = JSON.parse(localStorage.getItem("orderData"));
  mediaUrl :any;
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { 
    this.mediaUrl = this.api.mediaURL;
  }

  ngOnInit() {
    this.viewProduct()
  }

  goToViewOrder(){
    this.router.navigate(['/view-order'], {state : {order_id :this.order.id}});
  }

  viewProduct(){    
    this.util.presentLoading();
    this.api.get('api/product/'+this.order.product_id).subscribe((data: any) => {
      this.product = data
      this.util.hideLoading();
    });
  }

}

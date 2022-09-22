import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  pickups : any = [];
  loc : any;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  constructor( 
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) { 
    
  }

  ngOnInit() {
    this.getOrders()
  }


  doRefresh(event) {
    this.getOrders()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  getOrders(){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.userInfo.id),
    }
    this.api.post('api/pickups', param).subscribe((data: any) => {
      this.pickups = data;
      this.util.hideLoading();
    }, error => {
    });
  }

  goToViewOrder(order){    
    this.router.navigate(['/view-order'], {state : {order_id :order.order_id}});
  }

}

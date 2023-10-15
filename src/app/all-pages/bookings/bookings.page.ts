import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  pickups : any = [];
  loc : any;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  mediaUrl :any;
  constructor( 
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) { 
    this.mediaUrl = this.api.mediaURL;
  }

  ngOnInit() {
    this.getOrders()
  }

  doRefresh(event) {
    this.getOrders()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  
  getOrders(){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.userInfo.id),
    }
    this.api.post('api/repairs', param).subscribe((data: any) => {
      this.pickups = data;      
      this.util.hideLoading();
    }, error => {
    });
  }

  goToViewOrder(order){    
    this.router.navigate(['/view-booking'], {state : {order_id :order.order_id}});
  }

}

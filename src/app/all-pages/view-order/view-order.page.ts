import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  order_id : string;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  loc : any;
  order : any = {};
  constructor(public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    ) { }

  ngOnInit() {
    this.loc = this.location.getState(); 
    this.order = this.loc.order;
    console.log(this.order);
    //this.viewOrder()
    
  }

  viewOrder(){
    this.util.presentLoading(); 
    this.api.get('api/view-order/'+this.order_id).subscribe((data: any) => {
      console.log(data);
      this.order = data
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to load order! Please try again")
    });
  }
}

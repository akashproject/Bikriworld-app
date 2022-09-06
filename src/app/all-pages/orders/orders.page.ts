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
  ) { }

  ngOnInit() {
    console.log("hi",this.userInfo);
    this.getOrders()


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

}

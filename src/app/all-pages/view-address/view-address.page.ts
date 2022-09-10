import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.page.html',
  styleUrls: ['./view-address.page.scss'],
})
export class ViewAddressPage implements OnInit {
  address_id : string;
  loc : any;
  address: any = {
    id:'',
    type:'',
    address_1:'',
    city:'',
    state:'',
    pincode:'',
    token:''
  };
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
  ) { 
   
  }

  
  ngOnInit() {
    this.loc = this.location.getState(); 
    console.log(this.loc.address_id);
       
    if (this.loc.address_id !== null) {
      this.address_id = this.loc.address_id;
      this.viewAddress();
    }
    this.address.id = this.loc.address_id;
    
    this.address.token = btoa(this.userInfo.id);
  }

  validate(){
    console.log(this.address);
  }

  viewAddress(){
    this.util.presentLoading(); 
    this.api.get('api/view-address/'+this.address_id).subscribe((data: any) => {
      console.log(data);
      
      this.address = data
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to save address! Please try again")
    });
  }

  saveAddress(){
    this.util.presentLoading(); 
    this.api.post('api/save-address', this.address).subscribe((data: any) => {
      this.router.navigate(['/addresses']);
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to save address! Please try again")
    });
  }

}

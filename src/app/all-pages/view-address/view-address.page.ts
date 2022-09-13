import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.page.html',
  styleUrls: ['./view-address.page.scss'],
})
export class ViewAddressPage implements OnInit {
  @Input() address_id: any;
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
    private modalCtrl: ModalController
  ) { 
   
  }

  
  ngOnInit() {     
    console.log(this.address_id);
      
    if (this.address_id !== null) {
      this.viewAddress();
    }
    this.address.id = this.address_id;
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
      this.util.presentToast("Unable to load address! Please try again")
    });
  }

  saveAddress(){
    this.util.presentLoading(); 
    this.api.post('api/save-address', this.address).subscribe((data: any) => {
      this.util.hideLoading();
      return this.modalCtrl.dismiss(null, 'confirm');
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to save address! Please try again")
      return this.modalCtrl.dismiss(null, 'confirm');
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}

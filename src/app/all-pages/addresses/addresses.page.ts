import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { ViewAddressPage } from '../view-address/view-address.page';
@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

  addresses : any = [];
  loc : any;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter(){
    this.getAddress()
  }

  ngOnInit() {
    //this.getAddress()
  }


  getAddress(){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.userInfo.id),
    }
    this.api.post('api/addresses', param).subscribe((data: any) => {
      this.addresses = data;
      console.log(this.addresses.length);
      
      this.util.hideLoading();
    }, error => {

    });
  }

  async confirmDelete(id) {
    
    const alert = await this.alertController.create({
      header: 'Delete this address?',
      message: 'Once you delete! address permanently removed form your account',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteAddress(id)
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAddress(id){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.userInfo.id),
      "address_id":id
    }
    this.api.post('api/delete-address', param).subscribe((data: any) => {
      this.addresses = data;
      this.getAddress();
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
    });
  }

  async modalViewAddress(address_id = null){
    const modal = await this.modalCtrl.create({
      component: ViewAddressPage,
      componentProps: { address_id: address_id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getAddress();
    }
  }

}

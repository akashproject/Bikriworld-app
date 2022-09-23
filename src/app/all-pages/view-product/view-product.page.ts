import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  category_id = localStorage.getItem("category_id")
  disableBtn = true;
  
  constructor(
    public router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    localStorage.removeItem("veriation_price");
  }

  async gotoQuestion(){
    if(localStorage.getItem("veriation_price")){
      this.router.navigate(['/question']);
    } else {
      const alert = await this.alertController.create({
        header: 'Select Product Veriation',
        buttons: ['Dismiss']
      });
  
      await alert.present();
    }
  }


}

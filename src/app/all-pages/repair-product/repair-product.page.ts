import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-repair-product',
  templateUrl: './repair-product.page.html',
  styleUrls: ['./repair-product.page.scss'],
})
export class RepairProductPage implements OnInit {

  constructor(
    public router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async gotoQuote(){
    if(localStorage.getItem("selectedParts")){
      this.router.navigate(['/repair-quote']);
    } else {
      const alert = await this.alertController.create({
        header: 'Select Parts Item',
        buttons: ['Dismiss']
      });
      await alert.present();
    }
    
  }

}

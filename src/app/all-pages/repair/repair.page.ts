import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.page.html',
  styleUrls: ['./repair.page.scss'],
})
export class RepairPage {

  categories: any = [];
  constructor(
    public api: ApiService,
    public router: Router,
    private alertController: AlertController
  ) {    
    this.getCatagories();
  }

  getCatagories(){
    this.api.get('api/categories').subscribe((datas: any) => {
      this.categories = datas;
    });
  }

  goToBrands(category,sellType){
    localStorage.setItem("orderType",sellType)
    this.router.navigate(['/brands'], {state : {category_id :category}});
  }

  goToSearch(key){
    this.router.navigate(['/search'], {state : {key :key}});
  }

  async alertComingSoon() {
    
    const alert = await this.alertController.create({
      header: 'Coming Soon',
      message: 'This service will coming soon!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
          },
        },
      ],
    });

    await alert.present();
  }

}

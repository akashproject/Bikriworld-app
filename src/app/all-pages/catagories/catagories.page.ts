import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catagories',
  templateUrl: 'catagories.page.html',
  styleUrls: ['catagories.page.scss']
})
export class CatagoriesPage {

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

  goToBrands(category){
    if (category.status =="1") {
      this.router.navigate(['/brands'], {state : {category_id :category.id}});
    } else {
      this.alertComingSoon()
    }
    
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

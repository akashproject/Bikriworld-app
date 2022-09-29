import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController,ModalController} from '@ionic/angular';
import { CityPage } from '../all-pages/city/city.page';

@Injectable({
  providedIn: 'root'
})
export class AreaGuard implements CanActivate {
  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let city = ['Kolkata','Howrah','Patna'];  
      if(!localStorage.hasOwnProperty('selectedCity')){
        this.cityModal()
        return false;
      }
      
      if(city.indexOf(localStorage.getItem('selectedCity')) === -1) {
        this.alertModal();
        return false;
      }
      
      return true;
  }

  async alertModal() {
    const alert = await this.alertController.create({
      header: 'Service Unavailable',
      message: 'Sorry! Service unable on your city for now',
      buttons: [
        {
          text: '',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/']);
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/']);
          },
        },
      ],
    });

    await alert.present();
  }

  async cityModal(){
    const modal = await this.modalCtrl.create({
      component: CityPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }
  
}

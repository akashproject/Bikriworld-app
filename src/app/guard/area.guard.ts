import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AreaGuard implements CanActivate {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let city = ['Kolkata','Howrah','Patna'];      
      if(city.indexOf(localStorage.getItem('selectedCity')) === -1) {
        this.alertModal()
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
  
}

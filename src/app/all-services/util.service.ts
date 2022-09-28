import { Injectable } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading : any;
  isLoading = false;
  public userInfo: any;
  constructor(private loadingController : LoadingController,public toastController: ToastController) { }

  async presentLoading() {
    this.isLoading = true;
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Please Wait...'
    });
    // Present the loading controller
    await this.loading.present().then(() => {
      if (!this.isLoading) {
        this.loading.dismiss();
      }
    });;

 
  }

  hideLoading() {
    this.isLoading = false;
    this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  reset(){    
    let user = localStorage.getItem("user");
    let selectedCity = localStorage.getItem("selectedCity");
    localStorage.clear();
    localStorage.setItem("user",user);
    localStorage.setItem("selectedCity",selectedCity);
  }


}

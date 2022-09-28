import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CategoriesService } from '../../all-services/categories.service';
import { Router } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { ModalController } from '@ionic/angular';
import { CityPage } from '../city/city.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  categories : any = [];
  topSellingBrands : any = [];
  selectCity : any = (localStorage.getItem("selectedCity"))?localStorage.getItem("selectedCity"):'Select City';
  constructor(
    private location:Location,
    private router : Router,
    public api: ApiService,
    private modalCtrl: ModalController
  ) {    
    this.selectCity = (localStorage.getItem("selectedCity"))?localStorage.getItem("selectedCity"):'Select City';
  }
  
  slideOpts = {
    initialSlide: 0,
    autoplay:true,
    freeMode: true,
    speed: 400,
    slidesPerView: 1,
    watchSlidesProgress: true,
    grabCursor: true,
    spaceBetween: 0,    
  };

  slideBlogs = {
    initialSlide: 0,
    autoplay:true,
    freeMode: true,
    speed: 400,
    slidesPerView: 1.3,
    watchSlidesProgress: true,
    grabCursor: true,
    spaceBetween: 0,    
  };

  slideBrands = {
    initialSlide: 0,
    autoplay:true,
    freeMode: true,
    speed: 400,
    slidesPerView: 4,
    watchSlidesProgress: true,
    grabCursor: true,
    spaceBetween: 5,    
  };

  ngOnInit() {    
    this.getCategories();
    this.getTopSellingBrands();
  }

  getCategories(){    
    this.api.get('api/categories').subscribe((datas: any) => {      
      this.categories = datas;
    });
  }

  goToBrands(category_id){
    this.router.navigate(['/brands'], {state : {category_id :category_id}});
  }

  getTopSellingBrands(){
    this.api.get('api/top-brands').subscribe((datas: any) => {
      this.topSellingBrands = datas;
    });
  }

  async cityModal(){
    const modal = await this.modalCtrl.create({
      component: CityPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.selectCity = localStorage.getItem("selectedCity");
    }
  }


  
}

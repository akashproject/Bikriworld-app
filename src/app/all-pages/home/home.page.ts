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
  selectCity : any = "Select City"
  constructor(
    private location:Location,
    private router : Router,
    public api: ApiService,
    private modalCtrl: ModalController
  ) {

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
    console.log("Init");
    
    this.getCategories();
    this.getTopSellingBrands();
  }

  getCategories(){
    console.log("one");
    
    this.api.get('api/categories').subscribe((datas: any) => {
      console.log(datas);
      
      this.categories = datas;
    });
    console.log("last");
  }

  goToBrands(category_id){
    this.router.navigate(['/brands'], {state : {category_id :category_id}});
  }

  getTopSellingBrands(){
    this.api.get('api/top-brands').subscribe((datas: any) => {
      this.topSellingBrands = datas;
      console.log(datas);
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

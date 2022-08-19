import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CategoriesService } from '../../all-services/categories.service';
import { Router } from '@angular/router';
import { ApiService } from '../../all-services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  categories : any = [];
  constructor(
    private location:Location,
    private router : Router,
    public api: ApiService,
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

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.api.get('api/categories').subscribe((datas: any) => {
      this.categories = datas;
    });
  }

  goToBrands(category_id){
    this.router.navigate(['/brands'], {state : {category_id :category_id}});
  }
  
}

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CategoriesService } from '../../all-services/categories.service';
import { Router } from '@angular/router';

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
    private categoriesservice : CategoriesService,
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

  }

  getCategories(){
    this.categoriesservice.getCategories().subscribe(res =>{
      console.log(res);
      //this.loaderservice.hideLoading();
      this.categories = res;
    })
  }
  
}

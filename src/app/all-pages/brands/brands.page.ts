import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  category_id : string;
  loc : any;
  brands : any = [];
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
    
    this.loc = this.location.getState();
    this.category_id = this.loc.category_id;
    localStorage.setItem("category_id", this.category_id);
    this.getBrands()
    
  }

  getBrands(){
    this.util.presentLoading();
    this.api.get('api/brands/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.brands = datas;
      this.util.hideLoading();
    });
  }

  goToProducts(brand_id){
    localStorage.setItem("brand_id",brand_id);
    this.router.navigate(['/products'], {state : {brand_id :brand_id}});
  }

  goToSearch(key){
    this.router.navigate(['/search'], {state : {key :key}});
  }
  
}

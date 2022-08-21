import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  category_id : string;
  loc : any;
  brands : any = [];
  constructor(public api: ApiService,private location:Location,public router: Router,) { }

  ngOnInit() {
    this.loc = this.location.getState();
    this.category_id = this.loc.category_id;
    localStorage.setItem("category_id", this.category_id);
    this.getBrands()
    
  }

  getBrands(){
    this.api.get('api/brands/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.brands = datas;
    });
  }

  goToProducts(brand_id){
    this.router.navigate(['/products'], {state : {brand_id :brand_id}});
  }

}

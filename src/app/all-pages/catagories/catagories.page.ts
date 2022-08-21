import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';

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
  ) {    
    this.getCatagories();
  }

  getCatagories(){
    this.api.get('api/categories').subscribe((datas: any) => {
      this.categories = datas;
    });
  }

  goToBrands(category_id){
    this.router.navigate(['/brands'], {state : {category_id :category_id}});
  }

  goToSearch(key){
    this.router.navigate(['/search'], {state : {key :key}});
  }

}

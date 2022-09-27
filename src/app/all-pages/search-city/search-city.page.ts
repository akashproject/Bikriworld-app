import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.page.html',
  styleUrls: ['./search-city.page.scss'],
})
export class SearchCityPage implements OnInit {
  searchResults : any = [];
  loc : any;
  keyword : any = ''
  pagenum : number = 1;
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
  }

  getResults(next = false){       
    let params = {
      'keyword' : this.keyword
    }
    this.api.post('api/search-city?page='+this.pagenum,params).subscribe((data: any) => {
      if (next) {
        for (let i = 0; i < data.data.length; i++) {      
          this.searchResults.push(data.data[i]);
        }
      } else {
        this.searchResults = data.data
      }
            
    }, error => {
    });
  }

  async viewProduct(product_id){
    await this.getProductDetail(product_id)
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.pagenum++;
      this.getResults(true)
      event.target.complete();
      if (this.searchResults.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  getProductDetail(product_id){    
    this.api.get('api/product/'+product_id).subscribe((data: any) => {
      localStorage.setItem("brand_id",data.brand_id);
      localStorage.setItem("category_id", data.category_id);
      localStorage.setItem("product_id",  data.id);
      console.log("step1 ",localStorage.getItem("category_id"));
      this.util.hideLoading();
      this.router.navigate(['/view-product']);
    });
  }
}

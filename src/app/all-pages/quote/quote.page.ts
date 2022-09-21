import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {

  calculatedData : any = JSON.parse(localStorage.getItem("calculatedData"));
  user = JSON.parse(localStorage.getItem("user"));
  product : any = {};
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {    
    console.log(this.calculatedData);
    
    this.viewProduct()
  }
  goToSelectAddress(){
    this.router.navigate(['/select-addresses']);
  }

  viewProduct(){    
    this.util.presentLoading();
    this.api.get('api/product/'+localStorage.getItem("product_id")).subscribe((data: any) => {
      console.log(data);
      
      this.product = data
      this.util.hideLoading();
    });
  }
}

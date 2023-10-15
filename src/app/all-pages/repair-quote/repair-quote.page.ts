import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-repair-quote',
  templateUrl: './repair-quote.page.html',
  styleUrls: ['./repair-quote.page.scss'],
})
export class RepairQuotePage implements OnInit {

  selectedParts : any = JSON.parse(localStorage.getItem("selectedParts"));
  user = JSON.parse(localStorage.getItem("user"));
  product : any = {};
  mediaUrl :any;
  totalAmount : any = localStorage.getItem("totalAmount")
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService
  ) {
    this.mediaUrl = this.api.mediaURL;
    console.log(this.selectedParts);
    
   }

  ngOnInit() {        
    this.viewProduct()
  }

  goToCheckout(){
    this.router.navigate(['/repair-checkout']);
  }

  viewProduct(){    
    this.util.presentLoading();
    this.api.get('api/product/'+localStorage.getItem("product_id")).subscribe((data: any) => {      
      this.product = data
      this.util.hideLoading();
    });
  }

}

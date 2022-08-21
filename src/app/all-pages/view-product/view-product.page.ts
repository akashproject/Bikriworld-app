import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  product : any = []
  loc : any;
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location
  ) { }

  ngOnInit() {
    this.loc = this.location.getState();
    this.viewProduct(this.loc.product_id);
  }

  viewProduct(product_id){    
    this.api.get('api/product/'+product_id).subscribe((data: any) => {
      this.product = data;
    });
  }

}

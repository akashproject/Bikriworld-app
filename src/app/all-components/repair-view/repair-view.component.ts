import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-repair-view',
  templateUrl: './repair-view.component.html',
  styleUrls: ['./repair-view.component.scss'],
})
export class RepairViewComponent implements OnInit {

  product : any = []
  parts : any = []
  maxPrice : string;
  loc : any;
  category_id = localStorage.getItem("category_id")
  mediaUrl :any;
  total: any = 0;
  selectedParts : any = []
  disableBtn = true;

  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private modalCtrl: ModalController
  ) {
    this.mediaUrl = this.api.mediaURL;
    this.viewProduct();
    this.getParts();
   }

  ngOnInit() {
   
  }

  viewProduct(){    
    this.util.presentLoading();
    this.api.get('api/product/'+localStorage.getItem("product_id")).subscribe((data: any) => {
      this.product = data;
      this.util.hideLoading();
    });
  }

  getParts(){    
    //this.util.presentLoading();
    this.api.get('api/parts/'+localStorage.getItem("product_id")).subscribe((data: any) => {
      this.parts = data;
      console.log(data); 
    });
  }

  onChangeParts(event,variant){
    if (event.target.checked) {
        this.total = this.total + variant.price
        this.selectedParts.push(variant);
        this.disableBtn = false;
    } else {
       this.total = this.total - variant.price
       const index = this.selectedParts.findIndex(x => x.value === variant);
       this.selectedParts.pop(index);
    }
    localStorage.setItem('selectedParts',JSON.stringify(this.selectedParts));
    localStorage.setItem('totalAmount',this.total);
    
    if(this.selectedParts.length <= 0){
      this.disableBtn = true;
    }
  }

  back(){
    localStorage.removeItem("variation_type")
  }

}

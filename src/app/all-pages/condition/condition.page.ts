import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-condition',
  templateUrl: './condition.page.html',
  styleUrls: ['./condition.page.scss'],
})
export class ConditionPage implements OnInit {
  conditions : any =[];
  selectedCondition : any;
  disableBtn = true;
  
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
    this.getCondition();
  }

  getCondition(){
    this.util.presentLoading();
    this.api.get('api/condition/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.conditions = datas;
      this.util.hideLoading();
    });
  }

  setCondition(variant){
    this.selectedCondition = variant;
    this.disableBtn = false;
  }

  saveCondition(){
    this.util.presentLoading();   
    localStorage.setItem("condition", this.selectedCondition);
    let allConditions = {
      "category_id" : localStorage.getItem("category_id"),
      "product_id" : localStorage.getItem("product_id"),
      "variation_type" : localStorage.getItem("variation_type"),
      "veriation_price" : localStorage.getItem("veriation_price"),
      "questions" : localStorage.getItem("questions"),
      "accessories" : localStorage.getItem("accessories"),
      "age" : localStorage.getItem("age"),
      "condition_id" : localStorage.getItem("condition"),
    }

    this.api.post('api/calculate-price', allConditions).subscribe((data: any) => {
      localStorage.setItem("calculatedData", JSON.stringify(data));
      this.util.hideLoading();
      this.router.navigate(['/quote']);
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Calculate! Please try again")
    });    
  }

}

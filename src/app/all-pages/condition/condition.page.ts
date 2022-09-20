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
  selectedCondition : any =[];
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
    this.selectedCondition.push(variant);
    this.disableBtn = false;
  }

  saveCondition(){
    //this.util.presentLoading();   
    localStorage.setItem("condition", JSON.stringify(this.selectedCondition));
    console.log(localStorage.getItem("questions"));
    console.log(localStorage.getItem("accessories"));
    console.log(localStorage.getItem("accessories"));
    console.log(localStorage.getItem("condition"));
    let allConditions = {
      "category_id" : localStorage.getItem("category_id"),
      "product_id" : localStorage.getItem("product_id"),
      "variant" : localStorage.getItem("variant"),
      "questions" : localStorage.getItem("questions"),
      "accessories" : localStorage.getItem("accessories"),
      "age" : localStorage.getItem("age"),
      "condition_id" : localStorage.getItem("condition"),
    }
    console.log();
    
    console.log(allConditions);
    
    this.api.post('api/calculate-price', allConditions).subscribe((data: any) => {
      
      //this.util.hideLoading();
    }, error => {

    });    

   // this.router.navigate(['/quote']);
  }

}

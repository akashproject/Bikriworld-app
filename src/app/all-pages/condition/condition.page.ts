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
    localStorage.setItem("condition", JSON.stringify(this.selectedCondition));
    console.log(this.selectedCondition);
    
    //this.router.navigate(['/age']);
  }

}

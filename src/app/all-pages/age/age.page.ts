import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-age',
  templateUrl: './age.page.html',
  styleUrls: ['./age.page.scss'],
})
export class AgePage implements OnInit {
  ages : any =[];
  selectedAge : any;
  disableBtn = true;
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
    this.getAge();
  }

  getAge(){
    this.util.presentLoading();   
    this.api.get('api/age/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.ages = datas;
      this.util.hideLoading();
    });
  }

  setAge(variant){
    this.selectedAge = variant;
    this.disableBtn = false;
  }

  saveCondition(){
    localStorage.setItem("age", this.selectedAge);    
    this.router.navigate(['/condition']);
  }

}

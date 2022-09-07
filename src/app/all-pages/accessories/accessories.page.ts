import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
})
export class AccessoriesPage implements OnInit {
  accessories : any = [];
  selectedAccessories : any = []
  disableBtn = true;
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
    this.getAccessories();
  }

  getAccessories(){
    this.util.presentLoading();   
    this.api.get('api/accessories/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.accessories = datas;
      this.util.hideLoading();
    });
  }

  onChangeAccessories(event,variant){
    if (event.target.checked) {
        this.selectedAccessories.push(variant);
        this.disableBtn = false;
    } else {
       const index = this.selectedAccessories.findIndex(x => x.value === variant);
       this.selectedAccessories.pop(index);
    }

    if(this.selectedAccessories.length <= 0){
      this.disableBtn = true;
    }
  }

  saveCondition(){
    localStorage.setItem("accessories", JSON.stringify(this.selectedAccessories));    
    this.router.navigate(['/age']);
  }

}

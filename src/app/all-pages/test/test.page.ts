import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  configuration : any = []
  selectedConfigurationLabel : any = []
  selectedDeviceConfiguration : any = []
  disableBtn = true

  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) { }

  ngOnInit() {
    this.getDeviceConfiguration()
  }

  getDeviceConfiguration(){
    this.api.get('api/get-device-configuration/'+localStorage.getItem("brand_id")).subscribe((data: any) => {
      this.configuration = data;
    });
  }

  handleChange(event,key){    
    //this.selectedDeviceConfiguration[key] = event.detail.value;
    if( 
      this.selectedDeviceConfiguration['processer'] &&
      this.selectedDeviceConfiguration['ram'] && 
      this.selectedDeviceConfiguration['hdd'] && 
      this.selectedDeviceConfiguration['screen']
    ) {
        this.disableBtn = false
      }
  } 

  saveCondition(){

    this.util.presentLoading();   
    let config = {
      'config':this.selectedDeviceConfiguration,
      'product_id': localStorage.getItem("product_id")
    }
    this.api.post('api/set-device-price', config).subscribe((data: any) => {
      this.util.hideLoading();
      let variation_type = "Release Year : "+this.selectedConfigurationLabel['year']+" | Processer : "+this.selectedConfigurationLabel['processer']+" | Ram : "+this.selectedConfigurationLabel['ram']+" | Storage : "+this.selectedConfigurationLabel['hdd']+" | Graphic : "+this.selectedConfigurationLabel['graphic']+" | Screen : "+this.selectedConfigurationLabel['screen']
      //localStorage.setItem("variant", JSON.stringify(variant));
      localStorage.setItem("variation_type", variation_type);
      localStorage.setItem("veriation_price", data);
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Calculate! Please try again")
    });    
    
  }


}

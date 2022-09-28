import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { AlertController ,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.page.html',
  styleUrls: ['./vehicle-configuration.page.scss'],
})
export class VehicleConfigurationPage implements OnInit {

  configuration : any = []
  selectedConfigurationLabel : any = []
  selectedVehicleConfiguration : any = []
  disableBtn = true
  city
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getVehicleConfiguration()
  }

  getVehicleConfiguration(){
    this.api.get('api/get-vehicle-configuration').subscribe((data: any) => {
      this.configuration = data;
    });
  }

  handleChange(event,key){    
    this.selectedConfigurationLabel[key] = event.detail.value.name;
    this.selectedVehicleConfiguration[key] = event.detail.value.id;
    if( 
      this.selectedVehicleConfiguration['year'] &&
      this.selectedVehicleConfiguration['km']
    ) {
        this.disableBtn = false
      }
  } 

  saveCondition(){    
    let variation_type = "Ragistration Year :"+this.selectedConfigurationLabel['year']+" | Kilometer Driven : "+this.selectedConfigurationLabel['km']+" | Registration City : "+this.city    
      //localStorage.setItem("variant", JSON.stringify(variant));
      localStorage.setItem("variation_type", variation_type);
      this.modalCtrl.dismiss(null, 'confirm');
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { AlertController ,ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/all-services/util.service';


@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.page.html',
  styleUrls: ['./order-placed.page.scss'],
})
export class OrderPlacedPage implements OnInit {

  order : any = {};
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  goToViewOrder(){
    this.router.navigate(['/view-order'], {state : {order :this.order}});
  }
}

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

  processer : any = []
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) { }

  ngOnInit() {
  }

  getProcesser(){
    this.api.get('api/processer').subscribe((data: any) => {
      this.processer = data;
    });
  }

  getRam(){
    this.api.get('api/ram').subscribe((data: any) => {
      this.processer = data;
    });
  }

  getHdd(){
    this.api.get('api/hdd').subscribe((data: any) => {
      this.processer = data;
    });
  }

  getScreenSize(){
    this.api.get('api/screen-size').subscribe((data: any) => {
      this.processer = data;
    });
  }

  getGraphicCard(){
    this.api.get('api/graphic-card').subscribe((data: any) => {
      this.processer = data;
    });
  }

}

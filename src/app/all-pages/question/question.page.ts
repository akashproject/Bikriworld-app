import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  questions : any = [];
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(){
    this.util.presentLoading();
    this.api.get('api/questions/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.questions = datas;
      this.util.hideLoading();
    });
  }

  saveCondition(){
    this.router.navigate(['/accessories']);
  }

}

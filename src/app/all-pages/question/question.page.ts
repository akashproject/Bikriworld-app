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
  checkedQuestions : any = []
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {    
    this.getQuestions();
  }

  onSelectQuestion(event,variant){
    if (event.target.checked) {
        this.checkedQuestions.push(variant);
    } else {
      const index = this.checkedQuestions.findIndex(x => x.value === variant);
      this.checkedQuestions.pop(index);
    }
  }

  getQuestions(){
    this.util.presentLoading();
    this.api.get('api/questions/'+localStorage.getItem("category_id")).subscribe((datas: any) => {
      this.questions = datas;
      this.util.hideLoading();
    });
  }

  saveCondition(){
    console.log(this.checkedQuestions);
    localStorage.setItem("questions", JSON.stringify(this.checkedQuestions));    
    this.router.navigate(['/accessories']);
  }

}

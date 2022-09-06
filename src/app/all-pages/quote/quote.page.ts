import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {

  constructor() { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    
  }

}

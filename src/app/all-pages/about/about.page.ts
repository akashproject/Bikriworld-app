import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  openURL(){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://bikriworld.com/about-us");
  }

}

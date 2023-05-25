import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { NgOtpInputModule } from  'ng-otp-input';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgOtpInputModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, FontAwesomeModule],
  providers: [/*SmsRetriever,AndroidPermissions,*/
    {
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
   }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas, fab, far);
	}
}

import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { AlertController,ModalController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  contact : any = {}
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private alertController: AlertController,
    public formBuilder: FormBuilder
  ) { 
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: [Validators.required, Validators.pattern('^[0-9]+$')],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      subject: ['', [Validators.required, Validators.minLength(2)]],
      message: ['', [Validators.required, Validators.minLength(2)]],
   })
  }
  

  ngOnInit() {
  }

  sendMessage() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      this.validationAlert()
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.util.presentLoading(); 
      this.api.post('api/save-contact', this.ionicForm.value).subscribe((data: any) => {
        console.log(data);
        this.successAlert();
        this.ionicForm.reset()
        this.util.hideLoading();
      }, error => {
        this.util.hideLoading();
      });
    }
  }

  async validationAlert() {
    const alert = await this.alertController.create({
      header: 'Oops !',
      message: 'Please Provide Valid Information',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            return true;
          },
        },
      ],
    });

    await alert.present();
  }


  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Great !',
      message: 'Your Information has been submitted successfully',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            return false;
          },
        },
      ],
    });

    await alert.present();
  }





}

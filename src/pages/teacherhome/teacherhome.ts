import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-teacherhome',
  templateUrl: 'teacherhome.html'
})
export class TeacherhomePage {
  userName:any;
  stuInf: any;

  constructor(public navCtrl: NavController) {

  }

}

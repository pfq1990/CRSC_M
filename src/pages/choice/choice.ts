import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AttendancePage } from "../attendance/attendance";
import { LocationPage } from '../location/location';
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html'
})
export class ChoicePage {
  //homeItem: any;
  constructor(public navCtrl: NavController) {

  }

  choselocationSign(){
  }

  askForLeave(){
  }

}


import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Course} from "../../shared/Course";

/**
 * Generated class for the PicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
})
export class PicturePage {
  course:Course;
  picurl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.course = this.navParams.get('course');
    this.picurl = this.navParams.get('url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  }

  save(){

  }

}

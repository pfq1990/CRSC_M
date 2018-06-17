import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Course_T} from "../../shared/Course_T";
import {Course} from "../../shared/Course";
import {Rule} from "../../shared/Rule";

/**
 * Generated class for the SignweekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signweek',
  templateUrl: 'signweek.html',
})
export class SignweekPage {
  course:Course;
  courseweek:number;
  courses_t:Course_T;
  type:string;
  rules:Rule[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.course = this.navParams.get('course');
    let t = this.navParams.get('state');
    if(t){
      this.type = "签退";
    }
    else{
      this.type = "签到"
    }
    let url = '/api/CoursePeriod/read/cid/'+this.course.cid;
    this.http.get(url).subscribe(res => {
      this.courses_t = res["data"];
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignweekPage');
  }

  canyou(course_t){
    let url = '/api/StudentPeriod/getRules/period_id/' + course_t.id;
    this.http.get(url).subscribe(res => {
      console.log(res);
    },error => {
      console.log(error)
    });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Course} from "../../shared/Course";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the CourseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  courses: Course[];
  sort:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient ) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
    });
    let url:string = '/api/StudentInstruction/read/uid/'+loginrecord.id;
    console.log(url)
    this.http.get(url).subscribe(res => {
      this.courses = res["data"];
      console.log(this.courses);
      if(this.courses){
        this.sort = '选择课程进行签到或签退'
      }
      else{
        this.sort = '目前无任何课程'
      }
      // let i:any = Object.keys(res["data"]);
      // let home = JSON.stringify(this.courses);
      // console.log(home);
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}

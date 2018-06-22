import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {TeacherCourseListPage} from "../teacher-course-list/teacher-course-list";
import {TeacherAddCoursePage} from "../teacher-add-course/teacher-add-course";
import {SignrulePage} from "../signrule/signrule";
import {StatisticsPage} from "../statistics/statistics";

@Component({
  selector: 'page-teacherhome',
  templateUrl: 'teacherhome.html'
})
export class TeacherhomePage {
  userName:any;
  stuInf: any;
  email:string;

  constructor(public navCtrl: NavController, private storage:LocalStorageProvider) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    this.userName = loginrecord.name;
    this.email = loginrecord.username;

  }

  gotocourselist(){
    this.navCtrl.push(TeacherCourseListPage);
  }
  gotoaddcourse(){
    this.navCtrl.push(TeacherAddCoursePage);
  }
  gotosignrule(){
    this.navCtrl.push(SignrulePage);
  }
  gotostatistics(){
    this.navCtrl.push(StatisticsPage);
  }

}

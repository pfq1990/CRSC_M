import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {Course} from "../../shared/Course";
import {Course_T} from "../../shared/Course_T";
import {TeacherCourseTimePage} from "../teacher-course-time/teacher-course-time";

/**
 * Generated class for the TeacherCourseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teacher-course-list',
  templateUrl: 'teacher-course-list.html',
})
export class TeacherCourseListPage {
  courses:Course[];
  courses_t: Course_T[];
  sort:string;
  id:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    this.id = loginrecord.id;
    let url1:string = '/api/Instruction/read/uid/'+this.id;
    this.http.get(url1).subscribe(res => {
        this.courses = res["data"];
      if(this.courses){
        this.sort = '点击课程查看时间'
      }
      else{
        this.sort = '目前无任何课程'
      }
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherCourseListPage');
  }

  selectCourse(course){
    let url:string = '/api/CoursePeriod/read_user/uid/'+this.id;
    this.http.get(url).subscribe(res => {
      this.courses_t = res["data"];
      this.navCtrl.push(TeacherCourseTimePage,{'course_t':this.courses_t, 'course':course});
    },error => {
      console.log(error)
    });
  }

}

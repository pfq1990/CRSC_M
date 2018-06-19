import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Course} from "../../shared/Course";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {Course_T} from "../../shared/Course_T";
import {CourseTimePage} from "../course-time/course-time";

/**
 * Generated class for the CourseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-list',
  templateUrl: 'course-list.html',
})
export class CourseListPage {
  courses: Course[];
  courses_t:Course_T[];
  sort:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient ) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    let url:string = '/api/StudentInstruction/read/uid/'+loginrecord.id;
    console.log(url)
    this.http.get(url).subscribe(res => {
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

  // courseSelected(event, course) {
  //   this.navCtrl.push(PositionPage, {
  //     item: course
  //   })
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseListPage');
  }

  selectCourse(course){
    let url = '/api/CoursePeriod/read/cid/'+ course.cid;
    this.http.get(url).subscribe(res => {
      this.courses_t = res["data"];
      this.navCtrl.push(CourseTimePage,{'course_t':this.courses_t, 'course':course});
    },error => {
      console.log(error)
    });
  }

}

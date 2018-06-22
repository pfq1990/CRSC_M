import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {Course} from "../../shared/Course";
import {Course_T} from "../../shared/Course_T";

/**
 * Generated class for the TeacherCourseTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teacher-course-time',
  templateUrl: 'teacher-course-time.html',
})
export class TeacherCourseTimePage {
  teaching_weeks: number[];
  activeTeaching_week:number;
  activeWeek:number;
  courses_t:Course_T[];
  course:Course;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private actionSheetCtrl:ActionSheetController) {
    this.courses_t = this.navParams.get('course_t');
    this.course = this.navParams.get('course');
    let f = length => Array.from({length}).map((v,k) => k);
    this.teaching_weeks = f(this.courses_t[this.courses_t.length - 1].teaching_week);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherCourseTimePage');
  }

  selectTeaching_week(teaching_week){
    this.activeTeaching_week = teaching_week;
  }

  selectWeek(week,course_t){
    this.activeWeek = week;
    let actionSheet = this.actionSheetCtrl.create({
      title: '点击获取相应信息',
      buttons: [
        {
          text: '课程名:' + this.course.course_name,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '课程名',
              message:this.course.course_name,
              buttons:['确定']
            });
            alert.present();
          }
        },{
          text: '学生总数:' + this.course.student_number + "人",
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '任课教师',
              message:this.course.student_number + "人",
              buttons:['确定']
            });
            alert.present();
          }
        },{
          text: '上课教室:' + course_t.class_room,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '上课教室',
              message:course_t.class_room,
              buttons:['确定']
            });
            alert.present();
          }
        },{
          text: '上课时间:' + "第" + course_t.time + "节课",
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '上课时间',
              message:"第" + course_t.time + "节课",
              buttons:['确定']
            });
            alert.present();
          }
        },{
          text: '上课学期:' + this.course.teaching_year+ "学年，第" + this.course.term + "学期",
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '上课学期',
              message:this.course.teaching_year+ "学年，第" + this.course.term + "学期",
              buttons:['确定']
            });
            alert.present();
          }
        },{
          text: '返回',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

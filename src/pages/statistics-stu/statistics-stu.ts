import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Statistics_stu} from "../../shared/Statistics_stu";

/**
 * Generated class for the StatisticsStuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistics-stu',
  templateUrl: 'statistics-stu.html',
})
export class StatisticsStuPage {
  id:any;
  stus:Statistics_stu[];
  sort:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, private actionSheetCtrl:ActionSheetController) {
    this.id = this.navParams.get('stu');
    let url = '/api/Statistics/getuser/iid/' + this.id;
    this.http.get(url).subscribe(res => {
      this.stus = res["data"];
      if(this.stus){
        this.sort = '点击学生查看考勤情况'
      }
      else{
        this.sort = '该课程无任何学生'
      }
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsStuPage');
  }

  selectCourse(stu){
    let actionSheet = this.actionSheetCtrl.create({
      title: '学生考勤信息',
      buttons: [
        {
          text: '学号：'+ stu.number,
          handler: () => {

          }
        },{
          text: '所需签到次数：'+ stu.need_signon,
          handler: () => {

          }
        },{
          text: '总签到次数：'+ stu.sigon_count,
          handler: () => {

          }
        },{
          text: '旷课数：' + stu.play_truant,
          handler: () => {

          }
        },{
          text: '迟到数：' + stu.late,
          handler: () => {

          }
        },{
          text: '早退数：'+ stu.leave,
          handler: () => {

          }
        },{
          text: '取消',
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

import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Course_T} from "../../shared/Course_T";
import {Course} from "../../shared/Course";
import {Rule} from "../../shared/Rule";
import { Geolocation } from '@ionic-native/geolocation';
import {LocationPage} from "../location/location";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

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
  rule:Rule;
  state:any;
  id:any;
  i:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl:AlertController, private geolocation:Geolocation, private storage:LocalStorageProvider, private  actionSheetCtrl:ActionSheetController) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    this.id = loginrecord.id;
    this.course = this.navParams.get('course');
    this.state = this.navParams.get('state');
    if(this.state){
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
      let judge = res["status"];
      if(judge){
        let alert = this.alertCtrl.create({
          title: '提示',
          message:res["msg"],
          buttons:['确定']
        });
        alert.present();
      }
      else{
        this.rule = res["data"];
        this.geolocation.getCurrentPosition().then((resp) => {
          let d2 = this.GetDistance(this.rule.latitude, this.rule.longitude, resp.coords.latitude, resp.coords.longitude);
          if(d2 > this.rule.distance){
            let alert = this.alertCtrl.create({
              title: '提示',
              message:"超出上课教室范围",
              buttons:['确定']
            });
            alert.present();
          }else{
            let time = (Date.now())/1000;
            if(this.state){
              if(time < this.rule.begin_signout_time){
                let actionSheet = this.actionSheetCtrl.create({
                  title: '当前时间签退将被判为早退，仍要签退吗？',
                  buttons: [
                    {
                      text: '确定',
                      handler: () => {
                        this.i = 2;
                        let url = '/api/StudentPeriod/signout/period_id/' + course_t.id + '/student_id/' + this.id + '/signout/' + this.i;
                        this.http.get(url).subscribe(res => {
                          console.log(res);
                          let alert = this.alertCtrl.create({
                            title: '提示',
                            message:res["msg"],
                            buttons:['确定']
                          });
                          alert.present();
                        },error => {
                          console.log(error)
                        });
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
              if(time > this.rule.end_signout_time){

                let alert = this.alertCtrl.create({
                  title: '提示',
                  message:"不在签退时间内",
                  buttons:['确定']
                });
                alert.present();
              }
              if(time > this.rule.begin_signout_time && time < this.rule.end_signout_time){
                this.i = 1;
                let url = '/api/StudentPeriod/signout/period_id/' + course_t.id + '/student_id/' + this.id + '/signout/' + this.i;
                this.http.get(url).subscribe(res => {
                  console.log(res);
                  let alert = this.alertCtrl.create({
                    title: '提示',
                    message:res["msg"],
                    buttons:['确定']
                  });
                  alert.present();
                },error => {
                  console.log(error)
                });
              }

            }else{
              if(time < this.rule.begin_signon_time){
                let alert = this.alertCtrl.create({
                  title: '提示',
                  message:"不在签到时间内",
                  buttons:['确定']
                });
                alert.present();
              }else{
                this.navCtrl.push(LocationPage,{'rule':this.rule, 'pid':course_t.id});
              }
            }

          }
        }).catch((error) => {
          console.log('Error getting location', error);
          let alert = this.alertCtrl.create({
            title: '提示',
            message:"当前网络异常，请稍后再试",
            buttons:['确定']
          });
          alert.present();
        });
      }
    },error => {
      console.log(error)
    });
  }

  GetDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
      Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10;
    return s;
  }


}

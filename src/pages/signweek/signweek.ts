import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl:AlertController, private geolocation:Geolocation, private storage:LocalStorageProvider) {
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
        // let dmsl = Math.floor(this.rule.longitude) + (this.rule.longitude - Math.floor(this.rule.longitude)) * 60
        this.geolocation.getCurrentPosition().then((resp) => {
          let d1 = this.getDistance(this.rule.latitude, this.rule.longitude, resp.coords.latitude, resp.coords.longitude);
          let d2 = this.GetDistance(this.rule.latitude, this.rule.longitude, resp.coords.latitude, resp.coords.longitude);
          if(d1 > this.rule.distance){
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
                this.i = 2;
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
              }
              let url = '/api/StudentPeriod/signout/period_id/' + course_t.id + '/student_id/' + this.id + '/signout/' + this.i;
              this.http.get(url).subscribe(res => {
                console.log(res);
                let alert = this.alertCtrl.create({
                  title: '提示',
                  message:"签退成功",
                  buttons:['确定']
                });
                alert.present();
              },error => {
                console.log(error)
              });
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
        });
      }
    },error => {
      console.log(error)
    });
  }

  getRad(d){
    var PI = Math.PI;
    return d*PI/180.0;
  }

  getDistance(lat1,lng1,lat2,lng2){
    var f = this.getRad((lat1 + lat2)/2);
    var g = this.getRad((lat1 - lat2)/2);
    var l = this.getRad((lng1 - lng2)/2);
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var s,c,w,r,d,h1,h2;
    var a = 6378137.0;//The Radius of eath in meter.
    var fl = 1/298.257;
    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;
    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;
    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;
    s = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    s = s/1000;
    s = s.toFixed(2);//指定小数点后的位数。
    console.log("1," + s)
    return s;
  }

  GetDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
      Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    console.log("2," + s)
    return s;
  }


}

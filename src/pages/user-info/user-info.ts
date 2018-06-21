import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LoginPage} from "../login/login";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {Md5} from "../../md5"
import {HomePage} from "../home/home";
import {Organization} from "../../shared/Organization";

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  register = {
    phone:'',
    email:'',
    userName:'',
    id:'',
    password:'',
    confirmPassword:'',
    code:'',
    university:'',
    college:'',
    major:'',
    gid:'',
    gender:'',
    oid:'',
  };
  time:number = 0;
  where:number;
  id:number;
  organizations:Organization[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, private alertCtrl:AlertController,public http: HttpClient) {
    this.where = this.navParams.get('where')
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    let url = '/api/Organization/read/type/1';
    this.http.get(url).subscribe(res => {
      this.organizations = res["data"];
    },error => {
      console.log(error)
    });
  }

  @ViewChild('registerSlides') registerSlides:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
    this.registerSlides.lockSwipes(true);
  }
  next(){
    this.time = 1;
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipes(true);
  }
  next2(){
    this.next();
    this.next();
  }
  previous() {
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipes(true);
  }

  gotoLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  gotohome(){
    this.navCtrl.setRoot(HomePage);
  }

  store(){
    let url = '/api/UserInfo/edit/uid/' + this.id +'/gid/' + this.register.gid + '/name/' + this.register.userName + '/oid/' + this.register.oid + '/number/' + this.register.id;
    this.http.get(url).subscribe(res => {
      console.log(res);
      let alert = this.alertCtrl.create({
        title: '提示',
        message:res["msg"],
        buttons:['确定']
      });
      alert.present();
      this.next();
    },error => {
      console.log(error)
    });
  }

  // chooseSchool(course_data){
  //   //获取course_id并设置系统课程id
  //   // this.AddCourseList.chooseSchoolID= course_data.id;
  //   // this.AddCourseList.chooseLevel=course_data.level;
  //   //改变input框的值
  //   // this.changeFormValue('course_name', course_data.course_name);
  //   // this.form.patchValue({school: course_data.title});
  //   this.register.oid = course_data.id;
  //   console.log(this.register.oid);
  //   console.log(course_data);
  // }

}

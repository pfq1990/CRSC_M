import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {Md5} from "../../md5"
import {UserInfoPage} from "../user-info/user-info";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
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
    usertype:'',
    gender:''
  };
  sent:boolean = false;
  time:number = 60;
  button:string ='发送验证码';
  captcha:any;
  private deadline:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController,public http: HttpClient) {
  }
  @ViewChild('registerSlides') registerSlides:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.registerSlides.lockSwipes(true);
  }
  next(){
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipes(true);
  }
  previous() {
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipes(true);
  }

  validateCode() {
    let now = Date.now();
    if (now < this.deadline) {
      //get
      this.store();
    }
    else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message:'邮件验证码已过期',
        buttons:['确定']
      });
      alert.present();
      // console.log('短信验证码不正确或者已过期');
    }
  }
  send(){
    this.deadline = Date.now() + 60 * 10 * 1000;
    let url = '/api/Register/send_mail/name/' +  this.register.email; //获取验证码
    this.http.get(url).subscribe(data => {
      this.captcha = data["status"];
      let alert = this.alertCtrl.create({
        title: '提示',
        message:data["msg"],
        buttons:['确定']
      });
      alert.present();
    },error => {
      console.log(error)
    });
    // console.log(this.authenticationCodeService.createCode(4));
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
    if(this.captcha == 0){
      this.sent = true;
      this.count();
    }
  }
  count(){
    setTimeout(() => {
      //console.log(this.timerRemainSeconds);
      if(this.time){
        this.time--;
        this.button = this.time + 's';
        this.count();
      }
      else {
        this.time = 60;
        this.sent = false;
        this.button = '重新发送';
      }
    }, 1000);
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

  store(){
    let pwd:string = Md5.hashStr(this.register.password).toString();
    let url = '/api/Register/register/name/' + this.register.email +'/pwd/' + pwd + '/captcha/' + this.register.code;
    this.http.get(url).subscribe(res => {
      console.log(res);
      let i = res["status"];
      let alert = this.alertCtrl.create({
        title: '提示',
        message:res["msg"],
        buttons:['确定']
      });
      alert.present();
      if(i == 0){
        this.navCtrl.push(UserInfoPage,{'where':0,'pwd':pwd,'name':this.register.email})
      }
    },error => {
      console.log(error)
    });
  }

}

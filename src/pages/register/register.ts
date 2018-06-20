import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LoginPage} from "../login/login";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationCodeService:AuthenticationCodeProvider, private storage:LocalStorageProvider, private alertCtrl:AlertController,public http: HttpClient) {
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
    if (this.register.code == this.captcha && now < this.deadline) {
      //get
      this.store();
    }
    else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message:'邮件验证码不正确或者已过期',
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
      this.captcha = data;
      console.log(data);
      console.log(this.captcha);
    },error => {
      console.log(error)
    });
    let alert = this.alertCtrl.create({
      title: '提示',
      message:'验证码已发送至邮箱',
      buttons:['确定']
    });
    alert.present();
    // console.log(this.authenticationCodeService.createCode(4));
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
    this.sent = true;
    this.count();
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
    let url = '/api/Register/register/name/' + this.register.email +'/pwd/' + pwd + '/captcha/' + this.captcha;
    this.http.get(url).subscribe(res => {
      console.log(res);
      this.navCtrl.push(UserInfoPage,{'where':0})
    },error => {
      console.log(error)
    });
  }

}

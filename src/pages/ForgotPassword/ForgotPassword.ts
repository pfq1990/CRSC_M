import { Component , ViewChild } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {HomePage} from "../home/home";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  forgotPassword={
    email : '',
    password : '',
    confirmPassword : '',
    code : ''
  };
  isStart: boolean = false;
  timepan: string;
  wait :number=60;
  captcha:any;
  s:any;

  @ViewChild('forgotPasswrdSlides') forgotPasswrdSlides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private localStorage:LocalStorageProvider, public http:HttpClient) {
    this.s = this.navParams.get('s');
    this.timepan='获取验证码';
  }

  ionViewDidLoad() {
    this.forgotPasswrdSlides.lockSwipes(true);
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  toValidate(){
    let url = '/api/Register/send_mail/name/' +  this.forgotPassword.email; //获取验证码
    this.http.get(url).subscribe(res => {
      this.captcha = res;
      console.log(this.captcha);
    },error => {
      console.log(error)
    });
    let t='友情提示';
    let st='';

    if(this.forgotPassword.email!=''){
      this.send();
      this.next();
        }
        else {
      st+='请输入邮箱地址!';
      this.showAlert(t,st);
    }
  }

  validateCode(){
    if(this.captcha == this.forgotPassword.code){
      let url = '/api/Login/forget_password/name' + this.forgotPassword.email;
      this.http.get(url).subscribe(res => {
        console.log(res);
      },error => {
        console.log(error)
      });
      this.next();
    }else {
      let t='错误提示';
      let st='验证码不正确或者已过期';
      this.showAlert(t,st);
      console.log(st);
    }
  }

  toSuccess(){
    this.navCtrl.setRoot(LoginPage);
  }

send(){
  this.timepan='获取验证码';
  this.isStart=true;
  this.time();
  // console.log(this.authenticationCodeService.createCode(4));
  // alert("验证码：" + this.authenticationCodeService.createCode(4));
}
  time() {
    setTimeout(() => {
      if (this.wait > 0) {
        this.wait--;
        this.timepan = this.wait + "s后再次发送";
        this.time();
      }
      else {
        this.timepan = "再次发送";
        this.wait = 60;
        this.isStart = false;
      }
    }, 1000);
  }
  next(){
    this.forgotPasswrdSlides.lockSwipes(false);
    this.forgotPasswrdSlides.slideNext();
    this.forgotPasswrdSlides.lockSwipes(true);
  }
  previous(){
    this.forgotPasswrdSlides.lockSwipes(false);
    this.forgotPasswrdSlides.slidePrev();
    this.forgotPasswrdSlides.lockSwipes(true);
  }

  private showAlert(t:string,st:string){

    let alert=this.alertCtrl.create({
      title:t ,
      subTitle:st ,
      buttons:['关闭']
    });
    alert.present();
  }

  gotologin(){
    this.navCtrl.setRoot(HomePage);
  }
}

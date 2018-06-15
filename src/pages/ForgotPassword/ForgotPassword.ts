import { Component , ViewChild } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";

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

  @ViewChild('forgotPasswrdSlides') forgotPasswrdSlides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private authenticationCodeService:AuthenticationCodeProvider,private localStorage:LocalStorageProvider, public http:HttpClient) {
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
    // let userInfo:any =this.localStorage.get(this.forgotPassword.email,{
    //   phone : '',
    //   email : '',
    //   shopName : '',
    //   nameShort :'',
    //   password : '',
    //   userName :'',
    //   shopTel :'',
    //   registionDate:''
    // });
    // st+='不存在邮箱地址为'+this.forgotPassword.email+'的帐号!';
    // this.showAlert(t,st);
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
    // let userInfo:any =this.localStorage.get(this.forgotPassword.email,{
    //   phone : '',
    //   email : '',
    //   shopName : '',
    //   nameShort :'',
    //   password : '',
    //   userName :'',
    //   shopTel :'',
    //   registionDate:''
    // });
    // let t='错误提示';
    // let st='';
    // if(this.forgotPassword.password==""){
    //   st+='密码不能为空!! ';
    // }else if(this.forgotPassword.confirmPassword==""){
    //   st+='确认密码不能为空!! '
    // }else {
    //   if(this.forgotPassword.password==this.forgotPassword.confirmPassword){
    //     t='友情提示';
    //     st='恭喜您，密码修改成功！!';
    //     userInfo.password=this.forgotPassword.password;
    //     let url = "/api/Register/register";
    //     userInfo.registionDate=Date.now();
    //     this.localStorage.set(this.forgotPassword.email,userInfo);
    //     this.localStorage.set(userInfo.phone,userInfo);
        this.navCtrl.setRoot(LoginPage);

    //   }else {
    //     st+='确认密码和密码不一致!! ';
    //   }
    // }
    // this.showAlert(t,st);
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
}

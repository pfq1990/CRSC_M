import { Component , ViewChild } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
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
  s:any;

  @ViewChild('forgotPasswrdSlides') forgotPasswrdSlides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController, public http:HttpClient) {
    this.s = this.navParams.get('s');
  }

  ionViewDidLoad() {
    this.forgotPasswrdSlides.lockSwipes(true);
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  toValidate(){

    let t='友情提示';
    let st='';

    if(this.forgotPassword.email!=''){
      let url = '/api/Login/forget_password/name/' +  this.forgotPassword.email;
      this.http.get(url).subscribe(res => {
        let alert = this.alertCtrl.create({
          title: '提示',
          message:res["msg"],
          buttons:['确定']
        });
        alert.present();
      },error => {
        console.log(error)
      });
      this.next();
        }
        else {
      st+='请输入邮箱地址!';
      this.showAlert(t,st);
    }
  }

  toSuccess(){
    this.navCtrl.setRoot(LoginPage);
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

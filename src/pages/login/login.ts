import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";
import {HttpserviceProvider} from "../../providers/httpservice/httpservice";
import {ForgotPasswordPage} from "../ForgotPassword/ForgotPassword";
import {Md5} from "../../md5"
import {HttpClient} from '@angular/common/http';
import {TeacherhomePage} from "../teacherhome/teacherhome";
import {UserInfoPage} from "../user-info/user-info";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string = '';//视图模型的属性账号，双向绑定
  password:string = '';//视图模型的属性密码，双向绑定
  name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl:ToastController, private alertCtrl:AlertController, private storage:LocalStorageProvider,public http:HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //点击登录按钮时调用
  login(){
    //空用户名提示
    if(this.username==''){
      let toast = this.toastCtrl.create({
        message:'用户名不能为空',
        duration:3000
      });
      toast.present();
    }
    else{
      //数据存储在服务器时
      let pwd:string = Md5.hashStr(this.password).toString();

      // let url:string = 'http://cattermu.top/CRSS/index.php/Login/checkLoginClient/type/2/name/'+this.username+'/pwd/'+pwd;
      let url:string = '/api/Login/login/name/'+this.username+'/pwd/'+ pwd + '/type/2';

      this.http.get(url).subscribe(res => {
        console.log(res)
        let islogin:string = res["status"];
        let logininfo:string = res["msg"];
        let id:any = res["data"]["id"];
        let type:any = res["data"]["status"];
        this.name = res["data"]["name"];
        let gid:any = res["data"]["gid"]["0"]["group_id"];
        let alert = this.alertCtrl.create({
          title: '提示',
          message:logininfo,
          buttons:['确定']
        });
        alert.present();
        if(islogin == '0'){
          let now = Date.now();
          let loginrecord:any = this.storage.get('logintime',{
            time:'',
            logined:'',
            username:"",
            id:'',
            name:'',
            gid:'',
          });
          loginrecord.logined = true;
          loginrecord.time = now;
          loginrecord.username = this.username;
          loginrecord.id = id;
          loginrecord.name = this.name;
          loginrecord.gid = gid;
          this.storage.set('logintime',loginrecord);
          if(gid == 29){
            this.navCtrl.setRoot(HomePage);
          }else {
            if(gid = 28){
              this.navCtrl.setRoot(TeacherhomePage);
            }
            else {
              this.navCtrl.setRoot(UserInfoPage,{'where':1});
            }
          }
        }
      },error => {
        console.log(error)
      });
    }

  }

  gotoForgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }
}

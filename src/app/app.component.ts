import { Component, ViewChild } from '@angular/core';
import {Nav,Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {AddcoursePage} from "../pages/addcourse/addcourse";
import {AttendancePage} from "../pages/attendance/attendance";
import {ForgotPasswordPage} from "../pages/ForgotPassword/ForgotPassword";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;//HomePage;LoginPage;
  pages: Array<{title: string, component: any, icon: string}>;

  username:any;
  phone;any;
  name:any;
  gid:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage:LocalStorageProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: '首页', component: HomePage, icon: 'chatboxes'},
      {title: '修改密码', component: ForgotPasswordPage, icon: 'git-merge'},
      {title: '添加课程', component: AddcoursePage, icon: 'create'},
      // {title: '课堂考勤记录', component: ListPage, icon: 'create'},
      // {title: '考勤汇总', component: KaoqinPage},
      {title: '平时表现', component: AttendancePage, icon: 'cash'},
    ];
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:'',
      id:'',
      name:'',
      gid:'',
    });
    this.username = loginrecord.username;
    this.name = loginrecord.name;
    this.gid = loginrecord.gid;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  whichrootpage(){
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
    });
    let now = Date.now();
    if (loginrecord.logined && (now - loginrecord.time <= 5 * 24 * 60 * 60 * 1000)){
      this.rootPage = HomePage;
    }
    else{
      this.rootPage = LoginPage;
    }
  }

  gotologin(){
    this.nav.setRoot(LoginPage);
  }

}

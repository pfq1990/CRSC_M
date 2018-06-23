import { Component, ViewChild } from '@angular/core';
import {Nav,Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {LoginPage} from "../pages/login/login";
import {AddcoursePage} from "../pages/addcourse/addcourse";
import {ForgotPasswordPage} from "../pages/ForgotPassword/ForgotPassword";
import {WorktimePage} from "../pages/worktime/worktime";
import {TeacherCourseListPage} from "../pages/teacher-course-list/teacher-course-list";
import {TeacherhomePage} from "../pages/teacherhome/teacherhome";
import {TeacherAddCoursePage} from "../pages/teacher-add-course/teacher-add-course";
import {SignrulePage} from "../pages/signrule/signrule";
import {StatisticsPage} from "../pages/statistics/statistics";
import {SigninPage} from "../pages/signin/signin";
import {CourseListPage} from "../pages/course-list/course-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;//HomePage;LoginPage;UserInfoPage;
  pages: Array<{title: string, component: any, icon: string}>;

  username:any;
  phone;any;
  name:any;
  gid:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage:LocalStorageProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:'',
      id:'',
      name:'',
      gid:'',
    });
    let now = Date.now();
    if(loginrecord.time){
      if (loginrecord.logined && (now - loginrecord.time <= 5 * 24 * 60 * 60 * 1000)){
        if(loginrecord.gid == 29){
          this.rootPage = HomePage;
        }else{
          this.rootPage = TeacherhomePage;
        }
      }
      else{
        this.storage.remove('logintime');
        this.rootPage = LoginPage;
      }
    }
    this.gid = loginrecord.gid;
    if(loginrecord.username){
      this.username = loginrecord.username + '@qq.com';
      this.name = loginrecord.name;
    }else{
      this.username = '欢迎使用CRSC。';
      this.name = '您好！'
    }
    if(this.gid == 28){
      this.pages = [
        {title: '首页', component: TeacherhomePage, icon: 'chatboxes'},
        {title: '修改密码', component: ForgotPasswordPage, icon: 'git-merge'},
        {title: '查看课表', component: TeacherCourseListPage, icon: 'cash'},
        {title: '添加课程', component: TeacherAddCoursePage, icon: 'cash'},
        {title: '签到规则', component: SignrulePage, icon: 'cash'},
        {title: '考勤统计', component: StatisticsPage, icon: 'cash'},
        {title: '作息时间', component: WorktimePage, icon: 'cash'},
      ];
    }else{
      if(this.gid ==29){
        this.pages = [
          {title: '首页', component: HomePage, icon: 'chatboxes'},
          {title: '修改密码', component: ForgotPasswordPage, icon: 'git-merge'},
          {title: '查看课表', component: CourseListPage, icon: 'cash'},
          {title: '添加课程', component: AddcoursePage, icon: 'cash'},
          {title: '签到签退', component: SigninPage, icon: 'cash'},
          {title: '作息时间', component: WorktimePage, icon: 'cash'},
        ];
      }else{
        this.pages = [
          {title: '首页', component: HomePage, icon: 'chatboxes'},
          {title: '修改密码', component: ForgotPasswordPage, icon: 'git-merge'},
          {title: '作息时间', component: WorktimePage, icon: 'cash'},
        ];
      }
    }
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

  gotologin(){
    this.storage.remove('logintime');
    this.nav.setRoot(LoginPage);
  }

}

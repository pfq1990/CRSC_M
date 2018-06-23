import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {CopyrightComponent} from "../components/copyright/copyright";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {AuthenticationCodeProvider} from "../providers/authentication-code/authentication-code";
import {HttpClientModule} from "@angular/common/http";
import {ForgotPasswordPage} from "../pages/ForgotPassword/ForgotPassword";
import { LocationPage } from '../pages/location/location';
import {TeacherhomePage} from '../pages/teacherhome/teacherhome';
import {AddcoursePage} from "../pages/addcourse/addcourse";
import {CourseListPage} from "../pages/course-list/course-list";
import {SigninPage} from "../pages/signin/signin";
import { Geolocation } from '@ionic-native/geolocation';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {SignweekPage} from "../pages/signweek/signweek";
import {CourseTimePage} from "../pages/course-time/course-time";
import {UserInfoPage} from "../pages/user-info/user-info";
import {TeacherCourseListPage} from "../pages/teacher-course-list/teacher-course-list";
import {TeacherCourseTimePage} from "../pages/teacher-course-time/teacher-course-time";
import {TeacherAddCoursePage} from "../pages/teacher-add-course/teacher-add-course";
import {PicturePage} from "../pages/picture/picture";
import {SignrulePage} from "../pages/signrule/signrule";
import {StatisticsPage} from "../pages/statistics/statistics";
import {StatisticsSumPage} from "../pages/statistics-sum/statistics-sum";
import {StatisticsStuPage} from "../pages/statistics-stu/statistics-stu";
import {WorktimePage} from "../pages/worktime/worktime";
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CopyrightComponent,
    ForgotPasswordPage,
    LocationPage,
    TeacherhomePage,
    AddcoursePage,
    CourseListPage,
    SigninPage,
    SignweekPage,
    CourseTimePage,
    UserInfoPage,
    TeacherCourseListPage,
    TeacherCourseTimePage,
    TeacherAddCoursePage,
    PicturePage,
    SignrulePage,
    StatisticsPage,
    StatisticsSumPage,
    StatisticsStuPage,
    WorktimePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回', // 配置返回按钮的文字
      backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标
    }),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    LocationPage,
    TeacherhomePage,
    AddcoursePage,
    CourseListPage,
    SigninPage,
    SignweekPage,
    CourseTimePage,
    UserInfoPage,
    TeacherCourseListPage,
    TeacherCourseTimePage,
    TeacherAddCoursePage,
    PicturePage,
    SignrulePage,
    StatisticsPage,
    StatisticsSumPage,
    StatisticsStuPage,
    WorktimePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalStorageProvider,
    AuthenticationCodeProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    BarcodeScanner,
    File,
    FileTransfer
  ]
})
export class AppModule {}

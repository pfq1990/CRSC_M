import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddcoursePage} from "../addcourse/addcourse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {CourseListPage} from "../course-list/course-list";
import {SigninPage} from "../signin/signin";
import {WorktimePage} from "../worktime/worktime";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName:any;
  email:any;
  constructor(public navCtrl: NavController, private storage:LocalStorageProvider) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    this.userName = loginrecord.name;
    this.email = loginrecord.username;
  }

  gotocourselist(){
    this.navCtrl.push(CourseListPage);
  }
  gotosignin(){
    this.navCtrl.push(SigninPage);
  }
  gotoaddcourse(){
    this.navCtrl.push(AddcoursePage);
  }
  gotoworktime(){
    this.navCtrl.push(WorktimePage);
  }


}

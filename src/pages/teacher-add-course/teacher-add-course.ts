import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Course} from "../../shared/Course";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {PicturePage} from "../picture/picture";

/**
 * Generated class for the TeacherAddCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teacher-add-course',
  templateUrl: 'teacher-add-course.html',
})
export class TeacherAddCoursePage {
  courses:Course[];
  sort:string;
  id:number;
  picurl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    this.id = loginrecord.id;
    let url1:string = '/api/Instruction/read/uid/'+this.id;
    this.http.get(url1).subscribe(res => {
      this.courses = res["data"];
      if(this.courses){
        this.sort = '点击课程获取二维码'
      }
      else{
        this.sort = '目前无任何课程'
      }
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherAddCoursePage');
  }

  selectCourse(course){
     this.picurl = '/api/QrCode/create_qrcode/code/'+course.cid;
     this.navCtrl.push(PicturePage,{'url':this.picurl,'course':course})
  }

}

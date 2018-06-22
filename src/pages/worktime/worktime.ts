import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the WorktimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-worktime',
  templateUrl: 'worktime.html',
})
export class WorktimePage {
  oid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    let url = '/api/SignonRule/read/uid/' + loginrecord.id + '/gid/' + loginrecord.gid;
    this.http.get(url).subscribe(res => {
      this.oid = res["data"]["0"]["oid"];
    },error => {
      console.log(error)
    });
    let url1 = '/api/TimeTable/read/oid/' + this.oid;
    this.http.get(url1).subscribe(res => {
      console.log(res)
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorktimePage');
  }

}

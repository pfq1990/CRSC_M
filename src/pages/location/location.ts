import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Rule} from "../../shared/Rule";
import {HttpClient} from "@angular/common/http";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  rule:Rule;
  pai:number;
  lie:number;
  rows:number[];
  cols:number[];
  id:number;
  pid:any;
  i:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage:LocalStorageProvider) {
    this.rule = this.navParams.get('rule');
    this.pid = this.navParams.get('pid');
    let f = length => Array.from({length}).map((v,k) => k);
    this.rows = f(this.rule.row_number);
    this.cols = f(this.rule.col_number);
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    this.id = loginrecord.id;
  }

  sign(){
    let time = (Date.now())/1000;
    if(time > this.rule.end_signon_time){
      this.i = 2;
    }else {
      this.i = 1;
    }
    let url = '/api/StudentPeriod/signon/period_id/' + this.pid + '/student_id/' + this.id + '/signon/' + this.i +'/x/'+ this.pai + '/y/' + this.lie;
    this.http.get(url).subscribe(res => {
      console.log(res)
    },error => {
      console.log(error)
    });
  }
}

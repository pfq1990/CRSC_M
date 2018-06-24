import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {HomePage} from "../home/home";
import {TeacherhomePage} from "../teacherhome/teacherhome";

/**
 * Generated class for the SignrulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signrule',
  templateUrl: 'signrule.html',
})
export class SignrulePage {
  id:any;
  intime:any;
  outtime:any;
  distance:any;
  oid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient, private alertCtrl:AlertController) {
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
      this.id = res["data"]["0"]["id"];
      this.oid = res["data"]["0"]["oid"];
      this.distance = res["data"]["0"]["distance"];
      this.intime = res["data"]["0"]["signon_time"];
      this.outtime = res["data"]["0"]["signout_time"];
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignrulePage');
  }

  ok(){
    let url = '/api/SignonRule/edit/id/' + this.id + '/oid/' + this.oid + '/signon_time/' + this.intime + '/signout_time/' + this.outtime + '/distance/' + this.distance;
    this.http.get(url).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: '提示',
        message:res["msg"],
        buttons:['确定']
      });
      alert.present();
      this.navCtrl.setRoot(TeacherhomePage);
    },error => {
      console.log(error)
    });
  }

}

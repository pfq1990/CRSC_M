import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {HomePage} from "../home/home";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

/**
 * Generated class for the AddcoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addcourse',
  templateUrl: 'addcourse.html',
})
export class AddcoursePage {
  courseID: any;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient, private alertCtrl:AlertController, private barcodeScanner:BarcodeScanner) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
    });
    this.id = loginrecord.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcoursePage');
  }

  scanBarcode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.courseID = barcodeData.text;
    }, (err) => {
      // An error occurred
    });
  }

  addcourse(){
    if(this.courseID){
      let url = '/api/StudentList/add/instruction_id/' + this.courseID + '/student_id/' + this.id;
      this.http.get(url).subscribe(res => {
        console.log(res);
        let alert = this.alertCtrl.create({
          title: '提示',
          message:'课程添加成功',
          buttons:['确定']
        });
        alert.present();
        this.navCtrl.push(HomePage);
      },error => {
        console.log(error)
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message:'课程编号不能为空',
        buttons:['确定']
      });
      alert.present();
    }

  }

}

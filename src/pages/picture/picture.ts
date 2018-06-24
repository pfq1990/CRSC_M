import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Course} from "../../shared/Course";
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the PicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
})
export class PicturePage {
  course:Course;
  picurl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transfer: FileTransfer, private file: File,private alertCtrl:AlertController) {
    this.course = this.navParams.get('course');
    this.picurl = this.navParams.get('url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  }

  save(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.picurl;
    fileTransfer.download(url, 'file:///storage/sdcard0/Download/' +  'QR_Code.png').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      let alert = this.alertCtrl.create({
        title: '提示',
        message:"图片存至手机内存Download文件夹中",
        buttons:['确定']
      });
      alert.present();
    }, (error) => {
      // handle error
      let alert = this.alertCtrl.create({
        title: '提示',
        message:"当前网络异常，请稍后再试",
        buttons:['确定']
      });
      alert.present();
    });
  }

}

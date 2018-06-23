import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private transfer: FileTransfer, private file: File,) {
    this.course = this.navParams.get('course');
    this.picurl = this.navParams.get('url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  }

  save(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.picurl;
    fileTransfer.download(url, this.file.dataDirectory + 'QR_Code.png').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

}

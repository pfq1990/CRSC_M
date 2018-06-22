import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {Statistics_sum} from "../../shared/Statistics_sum";
import {StatisticsSumPage} from "../statistics-sum/statistics-sum";
import {StatisticsStuPage} from "../statistics-stu/statistics-stu";

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  statistics:Statistics_sum[];
  sort:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient, private actionSheetCtrl:ActionSheetController) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
    });
    let url = '/api/Statistics/read/uid/' + loginrecord.id;
    this.http.get(url).subscribe(res => {
      this.statistics = res["data"];
      if(this.statistics){
        this.sort = '点击课程选择统计方式'
      }
      else{
        this.sort = '目前无任何课程'
      }
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

  selectCourse(statistic){
    let actionSheet = this.actionSheetCtrl.create({
      title: '点击课程选择统计方式',
      buttons: [
        {
          text: '总体情况',
          handler: () => {
            this.navCtrl.push(StatisticsSumPage,{'sta':statistic});
          }
        },{
          text: '各学生情况',
          handler: () => {
            this.navCtrl.push(StatisticsStuPage,{'stu':statistic.id});
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

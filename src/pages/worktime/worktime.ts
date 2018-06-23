import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {TimeTable} from "../../shared/TimeTable";

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
  timetables:TimeTable[];
  sort:any;
  gid:any;
  oid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider, public http:HttpClient, private actionSheetCtrl:ActionSheetController, private alertCtrl:AlertController) {
    let loginrecord:any = this.storage.get('logintime',{
      time:'',
      logined:'',
      username:"",
      id:'',
      name:'',
      gid:'',
      oid:'',
    });
    this.gid = loginrecord.gid;
    this.oid = loginrecord.oid;
    // let url = '/api/SignonRule/read/uid/' + loginrecord.id + '/gid/' + loginrecord.gid;
    // this.http.get(url).subscribe(res => {
    //   this.oid = res["data"]["0"]["oid"];
    // },error => {
    //   console.log(error)
    // });
    let url1 = '/api/TimeTable/read/oid/' + loginrecord.oid;
    console.log(url1)
    this.http.get(url1).subscribe(res => {
      this.timetables = res["data"];
      if(this.timetables){
        this.sort = '点击课程所占节次查看作息时间'
      }
      else{
        this.sort = '加载失败'
      }
    },error => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorktimePage');
  }

  selectCourse(timetable){
    if(this.gid == 28){
      let actionSheet = this.actionSheetCtrl.create({
        //title: '操作',
        buttons: [
          {
            text: '课程长度：'+ timetable.period,
            handler: () => {

            }
          },{
            text: '开始时间：'+ timetable.start_time,
            handler: () => {

            }
          },{
            text: '结束时间：'+ timetable.end_time,
            handler: () => {

            }
          },{
            text: '编辑该课时',
            handler: () => {
              let prompt = this.alertCtrl.create({
                // title: '添加作息时间',
                inputs: [
                  {
                    name: 'title',
                    placeholder: '节次'
                  },
                  {
                    name: 'start_time',
                    placeholder: '开始时间'
                  },
                  {
                    name: 'end_time',
                    placeholder: '结束时间'
                  },
                  {
                    name: 'perior_of_time',
                    placeholder: '时间分块'
                  },{
                    name: 'period',
                    placeholder: '学时数'
                  },
                ],
                buttons: [
                  {
                    text: '取消',
                    handler: data => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: '确定',
                    handler: data => {
                      if(data){
                        let url = '/api/TimeTable/edit/id/'+timetable.id+'/title/'+data.title+'/start_time/'+data.start_time+'/end_time/'+data.end_time+'/oid/'+this.oid+'/perior_of_time/'+data.perior_of_time+'/period/'+data.period;
                        this.http.get(url).subscribe(res => {
                          let alert = this.alertCtrl.create({
                            title: '提示',
                            message:res["msg"],
                            buttons:['确定']
                          });
                          alert.present();
                        },error => {
                          console.log(error)
                        });
                      }
                      console.log(data);
                      console.log('Saved clicked');
                    }
                  }
                ]
              });
              prompt.present();
            }
          },{
            text: '删除该课时',
            handler: () => {
              let url = '/api/TimeTable/delete/id/'+timetable.id;
              this.http.get(url).subscribe(res => {
                let alert = this.alertCtrl.create({
                  title: '提示',
                  message:res["msg"],
                  buttons:['确定']
                });
                alert.present();
              },error => {
                console.log(error)
              });
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
    else{
      let actionSheet = this.actionSheetCtrl.create({
        //title: '操作',
        buttons: [
          {
            text: '课程长度：'+ timetable.period,
            handler: () => {

            }
          },{
            text: '开始时间：'+ timetable.start_time,
            handler: () => {

            }
          },{
            text: '结束时间：'+ timetable.end_time,
            handler: () => {

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

  ok(){
    let prompt = this.alertCtrl.create({
      title: '添加作息时间',
      inputs: [
        {
          name: 'title',
          placeholder: '节次'
        },
        {
          name: 'start_time',
          placeholder: '开始时间'
        },
        {
          name: 'end_time',
          placeholder: '结束时间'
        },
        {
          name: 'perior_of_time',
          placeholder: '时间分块'
        },{
          name: 'period',
          placeholder: '学时数'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if(data){
              let url = '/api/TimeTable/edit/title/'+data.title+'/start_time/'+data.start_time+'/end_time/'+data.end_time+'/oid/'+this.oid+'/perior_of_time/'+data.perior_of_time+'/period/'+data.period;
              this.http.get(url).subscribe(res => {
                let alert = this.alertCtrl.create({
                  title: '提示',
                  message:res["msg"],
                  buttons:['确定']
                });
                alert.present();
              },error => {
                console.log(error)
              });
            }
            console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-teacherlist',
  templateUrl: 'teacherlist.html'
})
export class TeacherlistPage {
  userName:any;
  id: any;
  courses: any;
  constructor(public navCtrl: NavController) {

  }

}

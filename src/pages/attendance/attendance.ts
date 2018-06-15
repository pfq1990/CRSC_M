import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage {
  id:any;
  courses:any;
  record:Array<{c:string, q:string, k:string, l:string}>

}

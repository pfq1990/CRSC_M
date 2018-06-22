import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Statistics_sum} from "../../shared/Statistics_sum";

/**
 * Generated class for the StatisticsSumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistics-sum',
  templateUrl: 'statistics-sum.html',
})
export class StatisticsSumPage {
  sta:Statistics_sum;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sta = this.navParams.get('sta');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsSumPage');
  }

}

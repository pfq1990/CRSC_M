import {Injectable, Injector} from '@angular/core';
// import {Http, Response} from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx'
import {Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {App, NavController, ToastController} from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import {Storage} from '@ionic/storage';

@Injectable()
export class HttpserviceProvider {
  host: string;

  constructor(private toastCtrl: ToastController,
              protected injector: Injector,
              protected app: App,
              private storage: Storage) {
  }

}

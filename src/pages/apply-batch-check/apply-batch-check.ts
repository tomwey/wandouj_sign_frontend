import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

/**
 * Generated class for the ApplyBatchCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-batch-check',
  templateUrl: 'apply-batch-check.html',
})
export class ApplyBatchCheckPage {

  // checkState: any;
  title: any;
  applies: any;
  checkTime: any;
  minDate: any;
  maxDate: any;

  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
    this.title = this.navParams.data.state == '0' ? '签到' : '签退';
    this.applies = this.navParams.data.users;

    dayjs.locale('zh-cn');

    this.checkTime = dayjs(new Date()).format();

    let now = new Date();
    now.setDate(now.getDate() + 1);
    this.maxDate = Utils.dateFormat(now);

    now = new Date();
    now.setDate(now.getDate() - 1);
    this.minDate = Utils.dateFormat(now);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ApplyBatchCheckPage');
    // console.log(Utils.dateFormat(new Date(), "YYYY-MM-DD HH:mm"));
  }

  close() {
    this.viewCtrl.dismiss();
  }

  commit() {
    let time = dayjs(this.checkTime).format("YYYY-MM-DD HH:mm:ss");
    let ids = [];
    this.applies.forEach(item => {
      ids.push(item.id);
    });
    this.users.ApplyBatchCheck(ids.join(','), time, this.navParams.data.state)
      .then(data => {
        this.tools.showToast(`${this.title}成功`);
        this.viewCtrl.dismiss('1');
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器超时，请重试");
      });
  }

}

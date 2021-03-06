import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the CrudFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crud-form',
  templateUrl: 'crud-form.html',
})
export class CrudFormPage {

  controls: any = [
    {
      id: 'name',
      name: "名字",
      type: 2,
      required: true,
      editable: true,
    },
    {
      id: 'mobile',
      name: '登录手机',
      type: 2,
      subtype: 'tel',
      required: true,
      editable: false
    }
  ];

  item: any = null;
  title: any;

  constructor(public navCtrl: NavController,
    private tools: Tools,
    private users: Users,
    private events: Events,
    public navParams: NavParams) {
    if (this.navParams.data.item) {
      this.item = this.navParams.data.item;
    }
    this.title = this.navParams.data.title;

    if (this.item) {
      this.controls.forEach(control => {
        control.value = this.item[control.id];
        control.disabled = !control.editable;
      });
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CrudFormPage');
  }

  save() {
    let id = null;
    if (this.item) {
      id = this.item.id;
    }

    let params = { ccid: id };

    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      if (control.type == 8) {
        // 开关
        params[control.id] = control.value ? 1 : 0;
      } else {
        params[control.id] = control.value;
      }

    }

    this.users.SaveChannel(params)
      .then(data => {
        this.tools.showToast("保存成功！");
        this.events.publish("reloadprofile");
        this.navCtrl.pop();
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器超时，请重试');
      });

    // console.log(this.permissionResources);
  }

}

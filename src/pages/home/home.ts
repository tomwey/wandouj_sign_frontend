import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content, Events, ModalController } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
// import { jsClipboard } from '../../provider/jsClipboard';
// import { Utils } from '../../provider/Utils';
// import { Body } from '@angular/http/src/body';
// import { Tools } from '../../provider/Tools';
// import { Tools } from '../../provider/Tools';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  contact: any = null;

  error: any = null;

  // checkState: any = -1;

  // selectedUsers: any = [];

  // hasSelectAll: boolean = false;

  operType: any = '1';
  companies: any = [];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    // private api: ApiService,
    // private app: App,
    private users: Users,
    private tools: Tools,
    private events: Events,
    // private modalCtrl: ModalController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.events.subscribe("reloadprofile", () => {
      this.loadHomeData();
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    // this.showOrHideToolbars();

    this.loadHomeData();

    // console.log(new Date().getDay());
    setTimeout(() => {
      this.loadCompanies();
    }, 200);
  }

  segmentChanged(ev) {
    this.loadCompanies();
  }

  loadCompanies() {
    this.users.GetTodayCheckCompanies(this.operType)
      .then(data => {
        this.companies = data['data'];
        this.error = this.companies.length === 0 ? '暂无数据' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      });
  }

  loadHomeData() {
    return new Promise((resolve) => {
      this.users.GetUserHomeData()
        .then(data => {
          // console.log(data);
          this.contact = data['data'];
          if (this.contact.qd_count != 0) {
            // this.filterItems[1].value = { label: "待签到", value: "0" };
            // this.checkState = '0';
          } else if (this.contact.qd_ed_count > this.contact.qt_ed_count) {
            // this.filterItems[1].value = { label: "待签退", value: "1" };
            // this.checkState = '1';
          } else {
            // this.filterItems[1].value = { label: "全部", value: "-1" };
            // this.checkState = '';
          }
          // this.loadApplies();

          resolve();
        })
        .catch(error => {
          this.error = error.message || "额，服务器出错了~";
          resolve();
        });
    });
  }

  openApplies(comp) {
    console.log(comp);
  }

  // selectFilterItem(item, callback) {
  //   if (item.field == "job_id") {
  //     // const compItem = this.filterItems[2];
  //     if (!compItem.value || !compItem.value.value) {
  //       this.tools.showToast("请先选择供应商");
  //       return;
  //     }

  //     this.users.GetCommJobs(compItem.value.value)
  //       .then(data => {
  //         let temp = [{ label: '全部', value: null }];
  //         let arr = data['data'];
  //         arr.forEach(ele => {
  //           temp.push({ label: `「${ele.project_name}」${ele.name}`, value: ele.id });
  //         });
  //         if (callback) {
  //           callback(temp);
  //         }
  //       })
  //       .catch(error => {

  //       });
  //   }
  // 
  //   if (item.field == "state") {
  //     let temp = [
  //       {
  //         label: '全部',
  //         value: -1
  //       },
  //       {
  //         label: '待签到',
  //         value: '0'
  //       },
  //       {
  //         label: '待签退',
  //         value: '1'
  //       },
  //       {
  //         label: '已签退',
  //         value: 2
  //       }
  //     ];
  //     if (callback) {
  //       callback(temp);
  //     }
  //   } else if (item.field == "merch_id") {
  //     const jobItem = this.filterItems[this.filterItems.length - 1];
  //     if (jobItem) jobItem.value = null;

  //     this.users.GetCommCompanies()
  //       .then(data => {
  //         // console.log(data);
  //         let temp = [{ label: '全部', value: null }];
  //         let arr = data['data'];
  //         arr.forEach(ele => {
  //           temp.push({ label: ele.alias_name, value: ele.id });
  //         });
  //         if (callback) {
  //           callback(temp);
  //         }
  //       })
  //       .catch(error => {

  //       });
  //   }
  // }

  // selectedFilterItem(item) {
  //   // console.log(item);
  //   this.showOrHideToolbars();

  //   this.loadApplies();
  // }

  // showOrHideToolbars() {
  //   let state = (this.filterItems[1].value || {}).value || -1;
  //   // this.checkState = state;
  // }

  handleCheck() {
    // if (this.selectedUsers.length === 0) return;

    // let modal = this.modalCtrl.create('ApplyBatchCheckPage', { state: this.checkState, users: this.selectedUsers });
    // modal.onDidDismiss((data) => {
    //   if (data) {
    //     this.loadHomeData();
    //     this.loadApplies();
    //   }
    // });
    // modal.present();
  }

  // loadApplies() {
  //   let date = this.filterItems[0].value;
  //   let state = (this.filterItems[1].value || {}).value;
  //   let merch_id = (this.filterItems[2].value || {}).value;
  //   let job_id = (this.filterItems[this.filterItems.length - 1].value || {}).value;

  //   this.users.GetApplies(date, state, merch_id, job_id)
  //     .then(data => {
  //       // console.log(data);
  //       this.applies = data['data'];
  //       this.error = this.applies.length === 0 ? '暂无报名人员' : null;
  //     })
  //     .catch(error => {
  //       this.error = error.message || "服务器出错了~";
  //     });
  // }

  checkin(item) {
    this.users.HandleSign('checkin', item)
      .then(data => {
        this.tools.showToast("签到成功");
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            item[key] = data['data'][key];
          }
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器超时，请重试");
      });
  }

  checkout(item) {
    this.users.HandleSign('checkout', item)
      .then(data => {
        this.tools.showToast("签退成功");
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            item[key] = data['data'][key];
          }
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "服务器超时，请重试");
      });
  }

  // selectAll() {
  //   this.hasSelectAll = !this.hasSelectAll;

  //   if (this.hasSelectAll) {
  //     let temp = [];
  //     this.applies.forEach(item => {
  //       item.cb_selected = true;
  //       temp.push(item);
  //     });
  //     this.selectedUsers = temp;
  //   } else {
  //     this.selectedUsers = [];

  //     this.applies.forEach(item => {
  //       item.cb_selected = false;
  //     });
  //   }
  // }

  // formatCheckBtnText() {
  //   return this.checkState == '0'
  //     ? `签到${this.selectedUsers.length === 0 ? '' : ' (' + this.selectedUsers.length + ')'}`
  //     : `签退${this.selectedUsers.length === 0 ? '' : ' (' + this.selectedUsers.length + ')'}`;
  // }

  // selectItem(item) {
  //   item.cb_selected = !item.cb_selected;

  //   if (item.cb_selected) {
  //     this.selectedUsers.push(item);
  //   } else {
  //     const index = this.selectedUsers.indexOf(item);
  //     if (index !== -1) {
  //       this.selectedUsers.splice(index, 1);
  //     }
  //   }

  //   this.hasSelectAll = this.selectedUsers.length === this.applies.length;
  // }

  // applies: any = [];

  // filterItems: any = [
  //   {
  //     name: '工作日期',
  //     field: 'work_date',
  //     isPicker: true,
  //     value: Utils.dateFormat(new Date())
  //   },
  //   {
  //     name: '签到状态',
  //     field: 'state',
  //     // value: {
  //     //   label: "待签到",
  //     //   value: "0"
  //     // },
  //     selectFunc: (item, callback) => {
  //       this.selectFilterItem(item, callback);
  //     }
  //   },
  //   {
  //     name: '所属供应商',
  //     field: 'merch_id',
  //     selectFunc: (item, callback) => {
  //       this.selectFilterItem(item, callback);
  //     }
  //   },
  //   {
  //     name: '所属兼职',
  //     field: 'job_id',
  //     selectFunc: (item, callback) => {
  //       this.selectFilterItem(item, callback);
  //     }
  //   }
  // ];

}

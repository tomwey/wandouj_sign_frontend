import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the AppliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applies',
  templateUrl: 'applies.html',
})
export class AppliesPage {


  error: any = null;
  checkState: any;

  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private modalCtrl: ModalController,
    private events: Events,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AppliesPage');
    setTimeout(() => {
      this.loadApplies();
    }, 300);
  }

  handleCheck() {
    if (this.selectedUsers.length === 0) return;

    let modal = this.modalCtrl.create('ApplyBatchCheckPage', {
      state: this.checkState,
      users: this.selectedUsers
    });
    modal.onDidDismiss((data) => {
      if (data) {
        // this.loadUsersForJob(this.currentJobID, this.operType);
        this.loadApplies();
        this.events.publish('reloaddata');
      }
    });
    modal.present();
  }

  loadApplies() {
    this.selectedUsers = [];
    this.hasSelectAll = false;

    let date = this.filterItems[0].value;
    let state = (this.filterItems[1].value || {}).value;
    let merch_id = (this.filterItems[2].value || {}).value;
    let job_id = (this.filterItems[this.filterItems.length - 1].value || {}).value;

    this.users.GetApplies(date, state, merch_id, job_id)
      .then(data => {
        // console.log(data);
        this.applies = data['data'];
        this.error = this.applies.length === 0 ? '暂无数据' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      });
  }

  formatCheckBtnText() {
    return this.checkState == '0'
      ? `签到${this.selectedUsers.length === 0 ? '' : ' (' + this.selectedUsers.length + ')'}`
      : `签退${this.selectedUsers.length === 0 ? '' : ' (' + this.selectedUsers.length + ')'}`;
  }

  selectFilterItem(item, callback) {
    if (item.field == "job_id") {
      const compItem = this.filterItems[2];
      if (!compItem.value || !compItem.value.value) {
        this.tools.showToast("请先选择供应商");
        return;
      }

      this.users.GetCommJobs(compItem.value.value)
        .then(data => {
          let temp = [{ label: '全部', value: null }];
          let arr = data['data'];
          arr.forEach(ele => {
            temp.push({ label: `「${ele.project_name}」${ele.name}`, value: ele.id });
          });
          if (callback) {
            callback(temp);
          }
        })
        .catch(error => {

        });
    }

    if (item.field == "state") {
      let temp = [
        {
          label: '全部',
          value: -1
        },
        {
          label: '待签到',
          value: '0'
        },
        {
          label: '待签退',
          value: '1'
        },
        {
          label: '已签退',
          value: 2
        }
      ];
      if (callback) {
        callback(temp);
      }
    } else if (item.field == "merch_id") {
      const jobItem = this.filterItems[this.filterItems.length - 1];
      if (jobItem) jobItem.value = null;

      this.users.GetCommCompanies()
        .then(data => {
          // console.log(data);
          let temp = [{ label: '全部', value: null }];
          let arr = data['data'];
          arr.forEach(ele => {
            temp.push({ label: ele.alias_name, value: ele.id });
          });
          if (callback) {
            callback(temp);
          }
        })
        .catch(error => {

        });
    }
  }

  selectItem(item) {
    item.cb_selected = !item.cb_selected;

    if (item.cb_selected) {
      this.selectedUsers.push(item);
    } else {
      const index = this.selectedUsers.indexOf(item);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }

    this.hasSelectAll = this.selectedUsers.length === this.applies.length;
  }

  selectAll() {
    this.hasSelectAll = !this.hasSelectAll;

    if (this.hasSelectAll) {
      let temp = [];
      this.applies.forEach(item => {
        item.cb_selected = true;
        temp.push(item);
      });
      this.selectedUsers = temp;
    } else {
      this.selectedUsers = [];

      this.applies.forEach(item => {
        item.cb_selected = false;
      });
    }
  }

  selectedFilterItem(item) {
    // console.log(item);
    this.showOrHideToolbars();

    this.loadApplies();
  }

  showOrHideToolbars() {
    let state = (this.filterItems[1].value || {}).value || -1;
    this.checkState = state;
  }

  applies: any = [];

  hasSelectAll: any = false;
  selectedUsers: any = [];

  filterItems: any = [
    {
      name: '工作日期',
      field: 'work_date',
      isPicker: true,
      value: Utils.dateFormat(new Date())
    },
    {
      name: '签到状态',
      field: 'state',
      // value: {
      //   label: "全部",
      //   value: "-1"
      // },
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    },
    {
      name: '所属供应商',
      field: 'merch_id',
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    },
    {
      name: '所属兼职',
      field: 'job_id',
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    }
  ];

}

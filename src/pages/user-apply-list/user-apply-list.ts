import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
// import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the UserApplyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-apply-list',
  templateUrl: 'user-apply-list.html',
})
export class UserApplyListPage {

  operType: any;
  comp_id: any;

  error: any = null;
  userList: any = [];

  selectedUsers: any = [];

  jobs: any = [];

  currentJobID: number;

  hasSelectAll: boolean = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private users: Users,
    // private tools: Tools,
    private modalCtrl: ModalController,
    private events: Events,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.comp_id = this.navParams.data.comp_id;
    this.operType = this.navParams.data.type;
    // console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserApplyListPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadTodayJobs();
    }, 200);
  }

  loadTodayJobs() {
    this.users.GetTodayJobsForComp(this.comp_id, this.operType)
      .then(data => {
        this.jobs = data['data'];

        if (this.jobs.length === 0) {
          this.error = "暂无数据";
        } else {
          this.error = null;

          let job = this.jobs[0];

          this.currentJobID = job.id;

          this.content.resize();

          this.loadUsersForJob(job.id, this.operType, false);
        }
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      });
  }

  selectJob(job) {
    if (this.currentJobID === job.id) return;
    this.currentJobID = job.id;

    this.loadUsersForJob(this.currentJobID, this.operType);
  }

  formatCheckBtnText() {
    return this.operType == '1'
      ? `签到${this.selectedUsers.length === 0 ? '' : ' (' + this.selectedUsers.length + ')'}`
      : `签退${this.selectedUsers.length === 0 ? '' : ' (' + this.selectedUsers.length + ')'}`;
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

    this.hasSelectAll = this.selectedUsers.length === this.userList.length;
  }

  selectAll() {
    this.hasSelectAll = !this.hasSelectAll;

    if (this.hasSelectAll) {
      let temp = [];
      this.userList.forEach(item => {
        item.cb_selected = true;
        temp.push(item);
      });
      this.selectedUsers = temp;
    } else {
      this.selectedUsers = [];

      this.userList.forEach(item => {
        item.cb_selected = false;
      });
    }
  }

  handleCheck() {
    if (this.selectedUsers.length === 0) return;

    let modal = this.modalCtrl.create('ApplyBatchCheckPage', {
      state: this.operType == '1' ? '0' : '1',
      users: this.selectedUsers
    });
    modal.onDidDismiss((data) => {
      if (data) {
        this.loadUsersForJob(this.currentJobID, this.operType);
        this.events.publish('reloaddata');
      }
    });
    modal.present();
  }

  loadUsersForJob(job_id, type, showLoading = true) {
    this.selectedUsers = [];
    this.hasSelectAll = false;

    this.users.GetUsersForJob(this.comp_id, job_id, type, showLoading)
      .then(data => {
        this.userList = data['data'];
        // console.log(this.userList);
        this.error = this.userList.length === 0 ? '暂无数据' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      })
  }

}

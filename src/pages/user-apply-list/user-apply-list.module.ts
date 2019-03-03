import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserApplyListPage } from './user-apply-list';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [
    UserApplyListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserApplyListPage),
    VirtualScrollerModule
  ],
})
export class UserApplyListPageModule { }

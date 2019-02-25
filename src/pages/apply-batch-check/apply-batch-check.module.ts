import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyBatchCheckPage } from './apply-batch-check';
// import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ApplyBatchCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyBatchCheckPage)
  ],
})
export class ApplyBatchCheckPageModule { }

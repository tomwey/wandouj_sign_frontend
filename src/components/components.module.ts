import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
import { RecentDatesBarComponent } from './recent-dates-bar/recent-dates-bar';
import { FilterBarsComponent } from './filter-bars/filter-bars';
import { ApplyInfoComponent } from './apply-info/apply-info';
@NgModule({
    declarations: [FormFieldsComponent,
        JobItemComponent,
        RecentDatesBarComponent, FilterBarsComponent,
    ApplyInfoComponent],
    imports: [IonicPageModule.forChild([FormFieldsComponent])],
    exports: [FormFieldsComponent,
        JobItemComponent,
        RecentDatesBarComponent, FilterBarsComponent,
    ApplyInfoComponent]
})
export class ComponentsModule { }

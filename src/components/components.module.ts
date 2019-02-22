import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
import { RecentDatesBarComponent } from './recent-dates-bar/recent-dates-bar';
import { FilterBarsComponent } from './filter-bars/filter-bars';
@NgModule({
    declarations: [FormFieldsComponent,
        JobItemComponent,
        RecentDatesBarComponent, FilterBarsComponent],
    imports: [IonicPageModule.forChild([FormFieldsComponent])],
    exports: [FormFieldsComponent,
        JobItemComponent,
        RecentDatesBarComponent, FilterBarsComponent]
})
export class ComponentsModule { }

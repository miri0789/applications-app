import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { InfoLoaderComponent } from '../info-loader/info-loader.component';


@NgModule({
  declarations: [
    ApplicationInfoComponent,
    ApplicationsListComponent,
    InfoLoaderComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }

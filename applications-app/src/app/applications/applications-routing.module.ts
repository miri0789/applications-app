import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';

export const appInfoRoute = 'info';

const routes: Routes = [
  { path: '', component: ApplicationsListComponent },
  { path: `${appInfoRoute}/:appId`, component: ApplicationInfoComponent },
  { path: '**', redirectTo: '' },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }

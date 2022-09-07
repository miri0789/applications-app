import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoute = 'applications';

const routes: Routes = [
  { path: '', redirectTo: appRoute, pathMatch: 'full' },
  {
    path: appRoute, loadChildren: () => import(`./applications/applications.module`).then(
      module => module.ApplicationsModule)
  },
  { path: '**', redirectTo: appRoute}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';

const routes: Routes = [{path:'', component: UserDataComponent}, {path:'userdata', component: UserDataComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

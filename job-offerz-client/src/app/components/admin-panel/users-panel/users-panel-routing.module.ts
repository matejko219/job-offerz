import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersPanelComponent} from "./users-panel.component";

const routes: Routes = [
  {path: '', component: UsersPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPanelRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPanelRoutingModule } from './users-panel-routing.module';
import {UsersPanelComponent} from "./users-panel.component";

@NgModule({
  imports: [
    CommonModule,
    UsersPanelRoutingModule
  ],
  declarations: [UsersPanelComponent]
})
export class UsersPanelModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPanelRoutingModule } from './users-panel-routing.module';
import {UsersPanelComponent} from "./users-panel.component";
import {SharedModule} from "../../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersPanelRoutingModule
  ],
  declarations: [UsersPanelComponent]
})
export class UsersPanelModule { }

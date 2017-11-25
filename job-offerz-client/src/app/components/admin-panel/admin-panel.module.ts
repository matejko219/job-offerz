import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import {AdminPanelComponent} from "./admin-panel.component";
import {SharedModule} from "../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule
  ],
  declarations: [AdminPanelComponent]
})
export class AdminPanelModule { }

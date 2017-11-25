import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesPanelRoutingModule } from './companies-panel-routing.module';
import {CompaniesPanelComponent} from "./companies-panel.component";
import {SharedModule} from "../../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompaniesPanelRoutingModule
  ],
  declarations: [CompaniesPanelComponent]
})
export class CompaniesPanelModule { }

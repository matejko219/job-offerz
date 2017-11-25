import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesPanelRoutingModule } from './companies-panel-routing.module';
import {CompaniesPanelComponent} from "./companies-panel.component";

@NgModule({
  imports: [
    CommonModule,
    CompaniesPanelRoutingModule
  ],
  declarations: [CompaniesPanelComponent]
})
export class CompaniesPanelModule { }

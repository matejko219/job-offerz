import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersPanelRoutingModule } from './offers-panel-routing.module';
import {OffersPanelComponent} from "./offers-panel.component";
import {SharedModule} from "../../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OffersPanelRoutingModule
  ],
  declarations: [OffersPanelComponent]
})
export class OffersPanelModule { }

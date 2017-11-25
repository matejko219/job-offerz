import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersPanelRoutingModule } from './offers-panel-routing.module';
import {OffersPanelComponent} from "./offers-panel.component";

@NgModule({
  imports: [
    CommonModule,
    OffersPanelRoutingModule
  ],
  declarations: [OffersPanelComponent]
})
export class OffersPanelModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOfferRoutingModule } from './add-offer-routing.module';
import { AddOfferComponent } from './add-offer.component';
import {SharedModule} from "../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    AddOfferRoutingModule,
    SharedModule
  ],
  declarations: [AddOfferComponent]
})
export class AddOfferModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOfferRoutingModule } from './edit-offer-routing.module';
import {EditOfferComponent} from "./edit-offer.component";
import {SharedModule} from "../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    EditOfferRoutingModule,
    SharedModule
  ],
  declarations: [EditOfferComponent]
})
export class EditOfferModule { }

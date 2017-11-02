import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOffersRoutingModule } from './my-offers-routing.module';
import { MyOffersComponent } from './my-offers.component';
import {SharedModule} from "../../shared/modules/shared.module";

@NgModule({
  imports: [
    CommonModule,
    MyOffersRoutingModule,
    SharedModule
  ],
  declarations: [MyOffersComponent]
})
export class MyOffersModule { }

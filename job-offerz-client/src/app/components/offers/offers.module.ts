import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import {SharedModule} from "../../shared/modules/shared.module";
import { OffersListComponent } from '../../shared/components/offers-list/offers-list.component';
import { OffersFilterComponent } from '../../shared/components/offers-filter/offers-filter.component';
import { OfferDetailsComponent } from '../../shared/components/offer-details/offer-details.component';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule
  ],
  declarations: [OffersComponent]
})
export class OffersModule { }

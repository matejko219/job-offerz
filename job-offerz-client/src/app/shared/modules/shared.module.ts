import { NgModule } from '@angular/core';
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OfferDetailsComponent} from "../components/offer-details/offer-details.component";
import {OffersFilterComponent} from "../components/offers-filter/offers-filter.component";
import {OffersListComponent} from "../components/offers-list/offers-list.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {OfferFormComponent} from "../components/offer-form/offer-form.component";

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    OfferDetailsComponent,
    OffersFilterComponent,
    OffersListComponent,
    OfferFormComponent
  ],
  exports: [
    MaterialModule,
    FormsModule,
    OfferDetailsComponent,
    OffersFilterComponent,
    OffersListComponent,
    OfferFormComponent
  ]
})
export class SharedModule { }

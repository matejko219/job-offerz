import { NgModule } from '@angular/core';
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OfferDetailsComponent} from "../components/offer-details/offer-details.component";
import {OffersFilterComponent} from "../components/offers-filter/offers-filter.component";
import {OffersListComponent} from "../components/offers-list/offers-list.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {OfferFormComponent} from "../components/offer-form/offer-form.component";
import {FavButtonComponent} from "../components/fav-button/fav-button.component";
import {BasicInfoStepComponent} from "../components/offer-form/basic-info-step/basic-info-step.component";
import {DescriptionStepComponent} from "../components/offer-form/description-step/description-step.component";
import {CompanyStepComponent} from "../components/offer-form/company-step/company-step.component";
import {OptionHasIdDirective} from "../../directives/option-has-id.directive";
import {CompanyFormComponent} from "../components/company-form/company-form.component";

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
    OfferFormComponent,
    FavButtonComponent,
    BasicInfoStepComponent,
    DescriptionStepComponent,
    CompanyStepComponent,
    OptionHasIdDirective,
    CompanyFormComponent
  ],
  exports: [
    MaterialModule,
    FormsModule,
    OfferDetailsComponent,
    OffersFilterComponent,
    OffersListComponent,
    OfferFormComponent,
    FavButtonComponent,
    OptionHasIdDirective,
    CompanyFormComponent
  ]
})
export class SharedModule { }

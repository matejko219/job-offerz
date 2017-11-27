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
import {ContactStepComponent} from "../components/offer-form/contact-step/contact-step.component";
import {ValidPhoneDirective} from "../../directives/valid-phone.directive";
import {ValidUrlDirective} from "../../directives/valid-url.directive";
import {TermsStepComponent} from "../components/offer-form/terms-step/terms-step.component";
import {BonusesStepComponent} from "../components/offer-form/bonuses-step/bonuses-step.component";
import {RequirementsStepComponent} from "../components/offer-form/requirements-step/requirements-step.component";
import {StarRateComponent} from "../components/star-rate/star-rate.component";
import {StarHoverDirective} from "../components/star-rate/directives/star-hover.directive";
import {CompanyService} from "../../services/company.service";
import {CategoryService} from "../../services/category.service";
import {OfferService} from "../../services/offer.service";
import {SplitEvenPipe} from "../components/offer-details/pipe/split-even.pipe";
import {LinkifyPipe} from "../pipes/linkify.pipe";
import {CategoriesSelectorComponent} from "../components/categories-selector/categories-selector.component";
import {FavoriteOfferService} from "../../services/favorite-offer.service";
import {DialogModule} from "./dialog/dialog.module";
import {SortArrowComponent} from "../components/sort-arrow/sort-arrow.component";
import {BasicFilterComponent} from "../components/basic-filter/basic-filter.component";
import {UserService} from "../../services/user.service";

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    DialogModule
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
    CompanyFormComponent,
    ContactStepComponent,
    ValidPhoneDirective,
    ValidUrlDirective,
    TermsStepComponent,
    BonusesStepComponent,
    RequirementsStepComponent,
    StarRateComponent,
    StarHoverDirective,
    SplitEvenPipe,
    LinkifyPipe,
    CategoriesSelectorComponent,
    SortArrowComponent,
    BasicFilterComponent
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
    CompanyFormComponent,
    ContactStepComponent,
    ValidPhoneDirective,
    ValidUrlDirective,
    TermsStepComponent,
    BonusesStepComponent,
    RequirementsStepComponent,
    StarRateComponent,
    StarHoverDirective,
    CategoriesSelectorComponent,
    SortArrowComponent,
    BasicFilterComponent
  ],
  providers: [
    CompanyService,
    CategoryService,
    OfferService,
    UserService,
    FavoriteOfferService
  ]
})
export class SharedModule { }
